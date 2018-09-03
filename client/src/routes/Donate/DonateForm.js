import { Form, Icon, Input, Button, Steps, Select } from 'antd';
import styles from './style.less';
import {  donate,queryCharitableAsset} from '../../services/blockchainApi'
const Option = Select.Option;
const FormItem = Form.Item;



const donorString = 'resource:org.example.charities.Donor#';
const donorID = '1111';
const queryDonorAsset = donorString + donorID;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class DonateForm extends React.Component {

  state = {
    asset: [],

  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    queryCharitableAsset().then(response => {
      response.forEach(asset => {
        if(asset.owner === queryDonorAsset ){
          this.setState(
            {asset:[...this.state.asset,asset]}
          )
        }
      });
    }).catch(error => {
      console.log(error)
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    var donateAssetId;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.asset.forEach(asset => {
          if(parseInt(asset.cadValue) === parseInt(values.money)) {
           donateAssetId = "org.example.charities.CharitableAsset#" + asset.assetId;
          }
        })
        console.log('Received values of form: ', values);
        this.props.onClick();
      }
    });
    donate(donateAssetId).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
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
            <Option value="15">$15</Option>
            <Option value="50">$50</Option>
            <Option value="100">$100</Option>
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

const DonateForm_2 = Form.create()(DonateForm);

export default DonateForm_2;
