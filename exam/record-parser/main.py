import json

import openapi_client
import time
from openapi_client.rest import ApiException
from pprint import pprint
from openapi_client import configuration
from server import create_server, handle_request
from setting import BACKEND_URL, SSL, PORT


# actions = ['输入', '删除', '粘贴', '重做', '撤销', '创建']


def timeline_analysis(_timeline):
    _type = _timeline['event']
    _action: str = '编辑'
    # if _type == 'onDidChangeModelContent':
    # if _type == 'onCreate':
    #     return '创建', 0, 0
    # if _type == 'onDidPaste':
    #     return '粘贴', 0, 0
    if _type == 'onDidChangeActiveTextEditor':
        return '打开文件', 0, 0
    event = _timeline['event']
    time = _timeline['time']

    changes = _timeline['changes']
    _total_add = 0
    _total_del = 0
    for c in changes:
        cl = len(c['text'])
        _total_del += c['rangeLength']
        _total_add += cl
        if cl > 1:
            _action = '粘贴'
        if cl != 0 and len((c['text']).strip()) == 0:
            _action = '换行'
    if _total_add == 0 and _total_del > 0:
        _action = '删除'

    # if event['isUndoing']:
    #     _action = "撤销"
    # if event['isRedoing']:
    #     _action = "重做"

    return _action, _total_add, _total_del


def record_analysis(_record):
    itl = map(lambda v: json.loads(v), _record.timeline)
    _timeline = []
    _paste_count = 0
    _undo_count = 0
    _total_add = 0
    _total_del = 0
    for tl in itl:
        action, t_add, t_del = timeline_analysis(tl)
        if action == '删除':
            _undo_count += 1
        if action == '粘贴':
            _paste_count += 1

        _total_add += t_add
        _total_del += t_del
        _timeline.append(dict({
            'time': int(tl['time']),
            'action': action,
            'add': t_add,
            'del': t_del
        }))
    return _timeline, _paste_count, _undo_count, _total_add, _total_del


def do(analysis_api, rec_api):
    try:
        pprint('checking for not analysis records')
        not_analysis = analysis_api.tl_analysis_controller_find(filter=json.dumps({'where': {'finished': False}}))
        pprint('found %s waiting analysis' % str(len(not_analysis)))
        for tla in not_analysis:
            try:
                rid = tla.record
                record = rec_api.record_controller_find_by_id(rid)
                timeline, paste_count, undo_count, total_add, total_del = record_analysis(record)
                tla.result = dict({
                    'timeline': timeline,
                    'paste': paste_count,
                    'undo': undo_count,
                    'add': total_add,
                    'del': total_del
                })
                tla.finished = True
                analysis_api.tl_analysis_controller_update_by_id(rid, timeline_analysis_partial=tla)
                pprint('record %s successfully updated' % rid)
            except ApiException as e1:
                pprint("Bad record at id: %s\n" % rid)
                # print("Exception when calling Api: %s\n" % e1)

        # api_response = api.ping_controller_ping()
    except ApiException as e:
        pprint("Exception when calling Api: %s\n" % e)


if __name__ == '__main__':
    # Defining host is optional and default to http://localhost:3000
    conf = configuration.Configuration()
    conf.host = BACKEND_URL
    conf.verify_ssl = SSL
    api_client = openapi_client.ApiClient(conf)
    with create_server(PORT) as server:
        pprint('listening on *:%s' % PORT)
        while True:
            socket, address = server.accept()
            handle_request(socket, address)
            do(openapi_client.TlAnalysisControllerApi(api_client), openapi_client.RecordControllerApi(api_client))
