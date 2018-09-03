import React from 'react';
import { Form, Icon, Input, Button, Steps, Select } from 'antd';
import styles from './style.less';

const Option = Select.Option;

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TaxForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onClick();
      }
    });
  };
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const moneyError = isFieldTouched('money') && getFieldError('money');
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem label="Chairty:">
          <span className={styles.contentTitle}>{this.props.choosenCharity}</span>
        </FormItem>
        <FormItem label="Amount" validateStatus={moneyError ? 'error' : ''} help={moneyError || ''}>
          {getFieldDecorator('money', {
            rules: [{ required: true, message: 'Please enter a number!' }],
          })(
            <Select defaultValue="500" style={{ width: 120 }}>
              <Option value="500">$500</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            size="large"
          >
            Donate
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const TaxForm_2 = Form.create()(TaxForm);

export default TaxForm_2;
