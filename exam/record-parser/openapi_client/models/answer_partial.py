# coding: utf-8

"""
    exam-back

    No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)  # noqa: E501

    The version of the OpenAPI document: 1.0.0
    Generated by: https://openapi-generator.tech
"""


import pprint
import re  # noqa: F401

import six

from openapi_client.configuration import Configuration


class AnswerPartial(object):
    """NOTE: This class is auto generated by OpenAPI Generator.
    Ref: https://openapi-generator.tech

    Do not edit the class manually.
    """

    """
    Attributes:
      openapi_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    openapi_types = {
        'question': 'float',
        'id': 'float',
        'content': 'str',
        'user': 'str',
        'judge': 'str'
    }

    attribute_map = {
        'question': 'question',
        'id': 'id',
        'content': 'content',
        'user': 'user',
        'judge': 'judge'
    }

    def __init__(self, question=None, id=None, content=None, user=None, judge=None, local_vars_configuration=None):  # noqa: E501
        """AnswerPartial - a model defined in OpenAPI"""  # noqa: E501
        if local_vars_configuration is None:
            local_vars_configuration = Configuration()
        self.local_vars_configuration = local_vars_configuration

        self._question = None
        self._id = None
        self._content = None
        self._user = None
        self._judge = None
        self.discriminator = None

        if question is not None:
            self.question = question
        if id is not None:
            self.id = id
        if content is not None:
            self.content = content
        if user is not None:
            self.user = user
        if judge is not None:
            self.judge = judge

    @property
    def question(self):
        """Gets the question of this AnswerPartial.  # noqa: E501


        :return: The question of this AnswerPartial.  # noqa: E501
        :rtype: float
        """
        return self._question

    @question.setter
    def question(self, question):
        """Sets the question of this AnswerPartial.


        :param question: The question of this AnswerPartial.  # noqa: E501
        :type: float
        """

        self._question = question

    @property
    def id(self):
        """Gets the id of this AnswerPartial.  # noqa: E501


        :return: The id of this AnswerPartial.  # noqa: E501
        :rtype: float
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this AnswerPartial.


        :param id: The id of this AnswerPartial.  # noqa: E501
        :type: float
        """

        self._id = id

    @property
    def content(self):
        """Gets the content of this AnswerPartial.  # noqa: E501


        :return: The content of this AnswerPartial.  # noqa: E501
        :rtype: str
        """
        return self._content

    @content.setter
    def content(self, content):
        """Sets the content of this AnswerPartial.


        :param content: The content of this AnswerPartial.  # noqa: E501
        :type: str
        """

        self._content = content

    @property
    def user(self):
        """Gets the user of this AnswerPartial.  # noqa: E501


        :return: The user of this AnswerPartial.  # noqa: E501
        :rtype: str
        """
        return self._user

    @user.setter
    def user(self, user):
        """Sets the user of this AnswerPartial.


        :param user: The user of this AnswerPartial.  # noqa: E501
        :type: str
        """

        self._user = user

    @property
    def judge(self):
        """Gets the judge of this AnswerPartial.  # noqa: E501


        :return: The judge of this AnswerPartial.  # noqa: E501
        :rtype: str
        """
        return self._judge

    @judge.setter
    def judge(self, judge):
        """Sets the judge of this AnswerPartial.


        :param judge: The judge of this AnswerPartial.  # noqa: E501
        :type: str
        """

        self._judge = judge

    def to_dict(self):
        """Returns the model properties as a dict"""
        result = {}

        for attr, _ in six.iteritems(self.openapi_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else x,
                    value
                ))
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else item,
                    value.items()
                ))
            else:
                result[attr] = value

        return result

    def to_str(self):
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        """Returns true if both objects are equal"""
        if not isinstance(other, AnswerPartial):
            return False

        return self.to_dict() == other.to_dict()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, AnswerPartial):
            return True

        return self.to_dict() != other.to_dict()
