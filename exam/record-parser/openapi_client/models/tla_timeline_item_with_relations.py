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


class TlaTimelineItemWithRelations(object):
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
        'action': 'str',
        'add': 'float',
        '_del': 'float',
        'time': 'float'
    }

    attribute_map = {
        'action': 'action',
        'add': 'add',
        '_del': 'del',
        'time': 'time'
    }

    def __init__(self, action=None, add=None, _del=None, time=None, local_vars_configuration=None):  # noqa: E501
        """TlaTimelineItemWithRelations - a model defined in OpenAPI"""  # noqa: E501
        if local_vars_configuration is None:
            local_vars_configuration = Configuration()
        self.local_vars_configuration = local_vars_configuration

        self._action = None
        self._add = None
        self.__del = None
        self._time = None
        self.discriminator = None

        if action is not None:
            self.action = action
        if add is not None:
            self.add = add
        if _del is not None:
            self._del = _del
        if time is not None:
            self.time = time

    @property
    def action(self):
        """Gets the action of this TlaTimelineItemWithRelations.  # noqa: E501


        :return: The action of this TlaTimelineItemWithRelations.  # noqa: E501
        :rtype: str
        """
        return self._action

    @action.setter
    def action(self, action):
        """Sets the action of this TlaTimelineItemWithRelations.


        :param action: The action of this TlaTimelineItemWithRelations.  # noqa: E501
        :type: str
        """

        self._action = action

    @property
    def add(self):
        """Gets the add of this TlaTimelineItemWithRelations.  # noqa: E501


        :return: The add of this TlaTimelineItemWithRelations.  # noqa: E501
        :rtype: float
        """
        return self._add

    @add.setter
    def add(self, add):
        """Sets the add of this TlaTimelineItemWithRelations.


        :param add: The add of this TlaTimelineItemWithRelations.  # noqa: E501
        :type: float
        """

        self._add = add

    @property
    def _del(self):
        """Gets the _del of this TlaTimelineItemWithRelations.  # noqa: E501


        :return: The _del of this TlaTimelineItemWithRelations.  # noqa: E501
        :rtype: float
        """
        return self.__del

    @_del.setter
    def _del(self, _del):
        """Sets the _del of this TlaTimelineItemWithRelations.


        :param _del: The _del of this TlaTimelineItemWithRelations.  # noqa: E501
        :type: float
        """

        self.__del = _del

    @property
    def time(self):
        """Gets the time of this TlaTimelineItemWithRelations.  # noqa: E501


        :return: The time of this TlaTimelineItemWithRelations.  # noqa: E501
        :rtype: float
        """
        return self._time

    @time.setter
    def time(self, time):
        """Sets the time of this TlaTimelineItemWithRelations.


        :param time: The time of this TlaTimelineItemWithRelations.  # noqa: E501
        :type: float
        """

        self._time = time

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
        if not isinstance(other, TlaTimelineItemWithRelations):
            return False

        return self.to_dict() == other.to_dict()

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        if not isinstance(other, TlaTimelineItemWithRelations):
            return True

        return self.to_dict() != other.to_dict()