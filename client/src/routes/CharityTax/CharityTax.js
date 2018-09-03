import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Avatar, Modal, Divider, Form } from 'antd';
import Ellipsis from 'components/Ellipsis';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Tax.less';

const FormItem = Form.Item;
const { Description } = DescriptionList;

const data = [
  {
    title: 'Gilly',
    avatar:'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77ac65f35be1387aab93df29a65ab104&auto=format&fit=crop&w=1241&q=80',
    date: '05/06/2018',
    total: '$500',
  },
  {
    title: 'Bradford L. Kemp',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    date: '02/05/2018',
    total: '$15',
  },
  {
    title: 'Bianca J. Becnel',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    date: '02/01/2017',
    total: '$500',
  },
  {
    title: 'Andrew M. Clark',
    avatar:
      'https://images.pexels.com/photos/213117/pexels-photo-213117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    date: '02/06/2018',
    total: '$50',
  },
];

@connect(({ tax, loading }) => ({
  tax,
  loading: loading.models.list,
}))
export default class TaxPage extends PureComponent {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'tax/fetch',
      payload: {
        count: 8,
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { tax: { tax }, loading } = this.props;
    const { visible, ModalText } = this.state;
    console.log(this.props);
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>All of the transcations history here, you can issue receipt directly from here</p>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    return (
      <PageHeaderLayout title="Transcation History" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href="">{item.title}</a>}
                  description={
                    <p>
                      {item.title} donated {item.total} on {item.date}{' '}
                    </p>
                  }
                />
                <Button onClick={() => this.showModal(item.name)}> Issue </Button>
              </List.Item>
            )}
          />
        </div>
        <Modal
          title="Offical Tax Receipt"
          visible={visible}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
          ]}
        >
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="Charitable No.">11930 4954 RR0001</Description>
            <Description term="Receipt No.">S236542</Description>
            <Description term="Receipt Issued">Toronto</Description>
            <Description term="Address">245 Eglinton Avenue East. Suite 410, Toronto, Ontario, M4P 3J1</Description>
            <Description term="Gift Date">05/06/2018</Description>
            <Description term="Amount">$500</Description>
          </DescriptionList>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
