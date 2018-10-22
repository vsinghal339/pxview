import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Subheading,
  Button,
  Dialog,
  RadioButton,
  TouchableRipple,
  Portal,
} from 'react-native-paper';
import { connectLocalization } from './Localization';

const styles = StyleSheet.create({
  dialogContentContainer: {
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
});

class SingleChoiceDialog extends Component {
  constructor(props) {
    super(props);
    const { selectedItemValue } = props;
    this.state = {
      selectedItemValue,
    };
  }

  handleOnSelectItem = value => {
    this.setState({
      selectedItemValue: value,
    });
  };

  handleOnPressOk = () => {
    const { onPressOk } = this.props;
    const { selectedItemValue } = this.state;
    onPressOk(selectedItemValue);
  };

  renderItems = () => {
    const { items } = this.props;
    const { selectedItemValue } = this.state;
    return (
      <View>
        {items.map(item =>
          <TouchableRipple
            key={item.value}
            onPress={() => this.handleOnSelectItem(item.value)}
          >
            <View style={styles.row}>
              <View pointerEvents="none">
                <RadioButton.Android
                  value={item.value}
                  status={
                    item.value === selectedItemValue ? 'checked' : 'unchecked'
                  }
                />
              </View>
              <Subheading style={styles.text}>
                {item.label}
              </Subheading>
            </View>
          </TouchableRipple>,
        )}
      </View>
    );
  };

  render() {
    const {
      visible,
      title,
      okLabel,
      cancelLabel,
      onPressCancel,
      scrollable,
      i18n,
    } = this.props;
    return (
      <Portal>
        <Dialog onDismiss={onPressCancel} visible={visible}>
          <Dialog.Title>
            {title}
          </Dialog.Title>
          {scrollable
            ? <Dialog.ScrollArea style={styles.dialogContentContainer}>
                <ScrollView>
                  {this.renderItems()}
                </ScrollView>
              </Dialog.ScrollArea>
            : <Dialog.Content style={styles.dialogContentContainer}>
                {this.renderItems()}
              </Dialog.Content>}
          <Dialog.Actions>
            <Button primary onPress={onPressCancel}>
              {cancelLabel || i18n.cancel}
            </Button>
            <Button primary onPress={this.handleOnPressOk}>
              {okLabel || i18n.ok}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

export default connectLocalization(SingleChoiceDialog);