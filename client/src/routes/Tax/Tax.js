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
    title: 'The World Wide Fund for Nature',
    avatar: 'https://www.spellbrand.com/images/blog/images/wwf-logo-design-trend.jpg',
    date: '02/03/2018',
    total: '$500',
  },
  {
    title: 'International Red Cross',
    avatar:
      'https://www.spellbrand.com/images/blog/images/international-red-cross-logo-design-trend.jpg',
    date: '02/05/2018',
    total: '$15',
  },
  {
    title: 'The Nature Conservancy',
    avatar:
      'https://www.spellbrand.com/images/blog/images/nature-conservancy-logo-design-trend.jpg',
    date: '02/01/2017',
    total: '$500',
  },
  {
    title: 'The United Nations Children’s Fund',
    avatar:
      'https://www.spellbrand.com/images/blog/images/united-nations-childrens-fund-logo-design-trend.jpg',
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
        <p>
          Your donation history here, you can request receipt for the donation as well as view the
          detail of the transcation
        </p>
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
      <PageHeaderLayout title="Donation History" content={content} extraContent={extraContent}>
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
                      {' '}
                      You donated {item.total} to {item.title} on {item.date}{' '}
                    </p>
                  }
                />
                <Button onClick={() => this.showModal(item.name)}> View </Button>
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
            <Description term="Receit Issued">Toronto</Description>
            <Description term="Address">245 Eglinton Avenue East. Suite 410, Toronto, Ontario, M4P 3J1</Description>
            <Description term="Gift Date">05/06/2018</Description>
            <Description term="Amount">$500</Description>
          </DescriptionList>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
