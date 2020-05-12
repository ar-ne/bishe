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


class TimelineAnalysisFilter1(object):
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
        'offset': 'int',
        'limit': 'int',
        'skip': 'int',
        'order': 'list[str]',
        'where': 'dict(str, object)',
        'fields': 'TimelineAnalysisFields'
    }

    attribute_map = {
        'offset': 'offset',
        'limit': 'limit',
        'skip': 'skip',
        'order': 'order',
        'where': 'where',
        'fields': 'fields'
    }

    def __init__(self, offset=None, limit=None, skip=None, order=None, where=None, fields=None, local_vars_configuration=None):  # noqa: E501
        """TimelineAnalysisFilter1 - a model defined in OpenAPI"""  # noqa: E501
        if local_vars_configuration is None:
            local_vars_configuration = Configuration()
        self.local_vars_configuration = local_vars_configuration

        self._offset = None
        self._limit = None
        self._skip = None
        self._order = None
        self._where = None
        self._fields = None
        self.discriminator = None

        if offset is not None:
            self.offset = offset
        if limit is not None:
            self.limit = limit
        if skip is not None:
            self.skip = skip
        if order is not None:
            self.order = order
        if where is not None:
            self.where = where
        if fields is not None:
            self.fields = fields

    @property
    def offset(self):
        """Gets the offset of this TimelineAnalysisFilter1.  # noqa: E501


        :return: The offset of this TimelineAnalysisFilter1.  # noqa: E501
        :rtype: int
        """
        return self._offset

    @offset.setter
    def offset(self, offset):
        """Sets the offset of this TimelineAnalysisFilter1.


        :param offset: The offset of this TimelineAnalysisFilter1.  # noqa: E501
        :type: int
        """
        if (self.local_vars_configuration.client_side_validation and
                offset is not None and offset < 0):  # noqa: E501
            raise ValueError("Invalid value for `offset`, must be a value greater than or equal to `0`")  # noqa: E501

        self._offset = offset

    @property
    def limit(self):
        """Gets the limit of this TimelineAnalysisFilter1.  # noqa: E501


        :return: The limit of this TimelineAnalysisFilter1.  # noqa: E501
        :rtype: int
        """
        return self._limit

    @limit.setter
    def limit(self, limit):
        """Sets the limit of this TimelineAnalysisFilter1.


        :param limit: The limit of this TimelineAnalysisFilter1.  # noqa: E501
        :type: int
        """
        if (self.local_vars_configuration.client_side_validation and
                limit is not None and limit < 1):  # noqa: E501
            raise ValueError("Invalid value for `limit`, must be a value greater than or equal to `1`")  # noqa: E501

        self._limit = limit

    @property
    def skip(self):
        """Gets the skip of this TimelineAnalysisFilter1.  # noqa: E501


        :return: The skip of this TimelineAnalysisFilter1.  # noqa: E501
        :rtype: int
        """
        return self._skip

    @skip.setter
    def skip(self, skip):
        """Sets the skip of this TimelineAnalysisFilter1.


        :param skip: The skip of this TimelineAnalysisFilter1.  # noqa: E501
        :type: int
        """
        if (self.local_vars_configuration.client_side_validation and
                skip is not None and skip < 0):  # noqa: E501
            raise ValueError("Invalid value for `skip`, must be a value greater than or equal to `0`")  # noqa: E501

        self._skip = skip

    @property
    def order(self):
        """Gets the order of this TimelineAnalysisFilter1.  # noqa: E501


        :return: The order of this TimelineAnalysisFilter1.  # noqa: E501
        :rtype: list[str]
        """
        return self._order

    @order.setter
    def order(self, order):
        """Sets the order of this TimelineAnalysisFilter1.


        :param order: The order of this TimelineAnalysisFilter1.  # noqa: E501
        :type: list[str]
        """

        self._order = order

    @property
    def where(self):
        """Gets the where of this TimelineAnalysisFilter1.  # noqa: E501


        :return: The where of this TimelineAnalysisFilter1.  # noqa: E501
        :rtype: dict(str, object)
        """
        return self._where

    @where.setter
    def where(self, where):
        """Sets the where of this TimelineAnalysisFilter1.


        :param where: The where of this TimelineAnalysisFilter1.  # noqa: E501
        :type: dict(str, object)
        """

        self._where = where

    @property
    def fields(self):
        """Gets the fields of this TimelineAnalysisFilter1.  # noqa: E501


        :return: The fields of this TimelineAnalysisFilter1.  # noqa: E501
        :rtype: TimelineAnalysisFields
        """
        return self._fields

    @fields.setter
    def fields(self, fields):
        """Sets the fields of this TimelineAnalysisFilter1.


        :param fields: The fields of this TimelineAnalysisFilter1.  # noqa: E501
        :type: TimelineAnalysisFields
        """

        self._fields = fields

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
        if not isinstance(other, TimelineAnalysisFilter1):
            return False

        return self.to_dict() == other.to_dict()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, TimelineAnalysisFilter1):
            return True

        return self.to_dict() != other.to_dict()