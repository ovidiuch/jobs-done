import { string, bool } from 'prop-types';
import React, { Component } from 'react';
import { Platform, Linking, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import parse from 'url-parse';

export class Url extends Component {
  static propTypes = {
    enabled: bool,
    url: string
  };

  handlePress = () => {
    Linking.openURL(this.props.url);
  };

  render() {
    const { enabled, url } = this.props;
    const { hostname } = parse(url);

    if (!enabled) {
      return <Link>{hostname}</Link>;
    }

    // The purpose of TouchableWithoutFeedback is just to stop propagating
    // press events to parent when Step is actives and urls can be clicked.
    // The LinkWrapper in the middle exists because otherwise
    // TouchableWithoutFeedback would render the inner link unclickable.
    if (Platform.OS === 'web') {
      return (
        <TouchableWithoutFeedback>
          <LinkWrapper>
            <Link href={url} accessibilityRole="link" target="_blank">
              {hostname}
            </Link>
          </LinkWrapper>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <Link>{hostname}</Link>
      </TouchableWithoutFeedback>
    );
  }
}

const LinkWrapper = styled.View`
  cursor: pointer;
`;

const Link = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: rgba(217, 223, 247, 0.6);
  text-decoration: underline solid rgba(217, 223, 247, 0.6);
`;
