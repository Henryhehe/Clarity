import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import fetch from 'isomorphic-fetch';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  message,
} from 'antd';

import DonateForm_2 from './DonateForm';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Donate.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ donate, loading }) => ({
  donate,
  loading: loading.models.list,
}))
export default class DonationPage extends PureComponent {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    choosenCharity: '',
  };
  //modal
  showModal = charity => {
    this.setState({
      visible: true,
      choosenCharity: charity,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });

    message.info('You have donated successfully');

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  ///

  componentDidMount() {
    this.props.dispatch({
      type: 'donate/fetch',
    });
  }

  render() {
    //charity mock up data
    const charity = this.props.donate.charity;
    const { loading } = this.props;
    const { visible, confirmLoading, ModalText } = this.state;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const ExtraContent = () => (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="environment">Environment</RadioButton>
          <RadioButton value="fundarisingOrganizations">Fundarising Organizations</RadioButton>
          <RadioButton value="healthServices">Health Services</RadioButton>
          <RadioButton value="hospitalFoundation">Hospital Foundation</RadioButton>
          <RadioButton value="internationalAid">International Aid and development</RadioButton>
          <RadioButton value="religion">Religion</RadioButton>
          <RadioButton value="socalServices">Social Services</RadioButton>
          <RadioButton value="Other">Other</RadioButton>
        </RadioGroup>
        {/* <Search className={styles.extraContentSearch} placeholder="Please enter" onSearch={() => ({})} /> */}
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 10,
      total: 10,
    };

    const ListContent = ({
      data: { FinalGrade, efficiency, fundraisingEfficiency, governanceGrade, reserveGrade, type },
    }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Type</span>
          <p>{type}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Efficiency</span>
          <p>{efficiency}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Fundraising Grade</span>
          <p>{fundraisingEfficiency}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Governance Grade</span>
          <p>{governanceGrade}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Final Grade</span>
          <p>{FinalGrade}</p>
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>more</a>
        </Menu.Item>
        <Menu.Item>
          <a />
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <Button>
          View<Icon type="down" />
        </Button>
      </Dropdown>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="Charity List"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 0px 40px 32px' }}
          >
            <ExtraContent />
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={charity}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="primary" onClick={() => this.showModal(item.name)}>
                      Donate
                    </Button>,
                    <MoreBtn />,
                  ]}
                >
                  <List.Item.Meta
                    title={<a href={item.website}>{item.name}</a>}
                    description={item.Mission}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
            <Modal
              title="Donate"
              visible={visible}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Return
                </Button>,
              ]}
            >
              <DonateForm_2 onClick={this.handleOk} choosenCharity={this.state.choosenCharity} />
            </Modal>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
