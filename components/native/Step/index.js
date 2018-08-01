import { number, string, bool, func, arrayOf, oneOf } from 'prop-types';
import React, { Component } from 'react';
import { Platform, Linking, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import parse from 'url-parse';
import { Checkbox } from '../Checkbox';

export class Step extends Component {
  static propTypes = {
    stepIndex: number.isRequired,
    name: string.isRequired,
    urls: arrayOf(string).isRequired,
    state: oneOf(['hidden', 'active', 'past']).isRequired,
    isChecked: bool.isRequired,
    onSelect: func.isRequired
  };

  handleSelect = () => {
    const { stepIndex, state, onSelect } = this.props;

    if (state !== 'hidden') {
      onSelect(stepIndex);
    }
  };

  render() {
    const { name, urls, state, isChecked } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.handleSelect}>
        <Container state={state}>
          <Left>
            <Name>{name}</Name>
            <Urls>
              {urls.map(url => (
                <Url key={url} enabled={state === 'active'} url={url} />
              ))}
            </Urls>
          </Left>
          <ButtonContainer>
            <Checkbox checked={isChecked} onSelect={this.handleSelect} />
          </ButtonContainer>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

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

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 0 20px 16px 20px;
  background: ${props =>
    props.state === 'active'
      ? 'rgba(217, 223, 247, 0.12)'
      : 'rgba(217, 223, 247, 0)'};
`;

const Left = styled.View`
  flex: 1;
  padding-right: 16px;
`;

const Name = styled.Text`
  margin: 16px 0 4px 0;
  color: rgba(217, 223, 247, 0.8);
  font-size: 18px;
  line-height: 24px;
`;

const Urls = styled.View`
  display: flex;
  flex-direction: column;
`;

const LinkWrapper = styled.View`
  margin: 0 auto 0 0;
`;

const Link = styled.Text`
  margin: 0 auto 0 0;
  font-size: 16px;
  line-height: 24px;
  color: rgba(217, 223, 247, 0.6);
  text-decoration: underline solid rgba(217, 223, 247, 0.6);
`;

const ButtonContainer = styled.View`
  flex-shrink: 0;
  margin: 16px 0 0 0;
`;
