function mysplit(inputstr, sep)
    local t = {}
    for str in string.gmatch(inputstr, '([^' .. sep .. ']+)') do
        table.insert(t, str)
    end
    return t
end
local key = mysplit(ngx.var.uri, '/')[1]
print('key: ', key)
-- print('$query_string: ', ngx.var.request_uri)
local res = ngx.location.capture('/redis', {args = {key = key}})

if res.status ~= 200 then
    ngx.log(ngx.ERR, 'redis server returned bad status: ', res.status)
    ngx.exit(res.status)
end

if not res.body then
    ngx.log(ngx.ERR, 'redis returned empty body')
    ngx.exit(500)
end

local parser = require('redis.parser')
local server, typ = parser.parse_reply(res.body)
if typ ~= parser.BULK_REPLY or not server then
    ngx.log(ngx.ERR, 'bad redis response: ', res.body)
    ngx.exit(500)
end

print('server: ', server)

ngx.req.set_uri( (string.gsub(ngx.var.uri, '/'..key, '', string.len(key)+1)) )
ngx.var.proxy = server
ngx.var.key = key
