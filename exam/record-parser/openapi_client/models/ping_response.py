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


class PingResponse(object):
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
        'greeting': 'str',
        'date': 'str',
        'url': 'str',
        'headers': 'dict(str, object)'
    }

    attribute_map = {
        'greeting': 'greeting',
        'date': 'date',
        'url': 'url',
        'headers': 'headers'
    }

    def __init__(self, greeting=None, date=None, url=None, headers=None, local_vars_configuration=None):  # noqa: E501
        """PingResponse - a model defined in OpenAPI"""  # noqa: E501
        if local_vars_configuration is None:
            local_vars_configuration = Configuration()
        self.local_vars_configuration = local_vars_configuration

        self._greeting = None
        self._date = None
        self._url = None
        self._headers = None
        self.discriminator = None

        if greeting is not None:
            self.greeting = greeting
        if date is not None:
            self.date = date
        if url is not None:
            self.url = url
        if headers is not None:
            self.headers = headers

    @property
    def greeting(self):
        """Gets the greeting of this PingResponse.  # noqa: E501


        :return: The greeting of this PingResponse.  # noqa: E501
        :rtype: str
        """
        return self._greeting

    @greeting.setter
    def greeting(self, greeting):
        """Sets the greeting of this PingResponse.


        :param greeting: The greeting of this PingResponse.  # noqa: E501
        :type: str
        """

        self._greeting = greeting

    @property
    def date(self):
        """Gets the date of this PingResponse.  # noqa: E501


        :return: The date of this PingResponse.  # noqa: E501
        :rtype: str
        """
        return self._date

    @date.setter
    def date(self, date):
        """Sets the date of this PingResponse.


        :param date: The date of this PingResponse.  # noqa: E501
        :type: str
        """

        self._date = date

    @property
    def url(self):
        """Gets the url of this PingResponse.  # noqa: E501


        :return: The url of this PingResponse.  # noqa: E501
        :rtype: str
        """
        return self._url

    @url.setter
    def url(self, url):
        """Sets the url of this PingResponse.


        :param url: The url of this PingResponse.  # noqa: E501
        :type: str
        """

        self._url = url

    @property
    def headers(self):
        """Gets the headers of this PingResponse.  # noqa: E501


        :return: The headers of this PingResponse.  # noqa: E501
        :rtype: dict(str, object)
        """
        return self._headers

    @headers.setter
    def headers(self, headers):
        """Sets the headers of this PingResponse.


        :param headers: The headers of this PingResponse.  # noqa: E501
        :type: dict(str, object)
        """

        self._headers = headers

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
        if not isinstance(other, PingResponse):
            return False

        return self.to_dict() == other.to_dict()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, PingResponse):
            return True

        return self.to_dict() != other.to_dict()