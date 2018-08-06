import { string, bool } from 'prop-types';
import React, { Component } from 'react';
import { Platform, Linking, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import parse from 'url-parse';

export class Link extends Component {
  static propTypes = {
    href: string.isRequired,
    disabled: bool
  };

  static defaultProps = {
    disabled: false
  };

  handlePress = () => {
    Linking.openURL(this.props.href);
  };

  render() {
    const { href, disabled } = this.props;
    const { hostname } = parse(href);

    if (disabled) {
      return <StyledLink>{hostname}</StyledLink>;
    }

    // The purpose of TouchableWithoutFeedback is just to stop propagating
    // press events to parent when Step is actives and urls can be clicked.
    // The Wrapper in the middle exists to prevent TouchableWithoutFeedback
    // from rendering the inner link unclickable.
    if (Platform.OS === 'web') {
      return (
        <TouchableWithoutFeedback>
          <Wrapper>
            <StyledLink href={href} accessibilityRole="link" target="_blank">
              {hostname}
            </StyledLink>
          </Wrapper>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <StyledLink>{hostname}</StyledLink>
      </TouchableWithoutFeedback>
    );
  }
}

const Wrapper = styled.View`
  cursor: pointer;
`;

const StyledLink = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: rgba(217, 223, 247, 0.6);
  text-decoration: underline solid rgba(217, 223, 247, 0.6);
`;
