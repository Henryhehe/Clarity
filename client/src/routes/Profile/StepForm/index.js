import React, { PureComponent, Fragment } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';
import styles from './style.less';

const { Step } = Steps;

const donorString = 'resource:org.example.charities.Donor#';
const donorID = '1111';
const queryDonorAsset = donorString + donorID;

export default class StepForm extends PureComponent {
  componentDidMount() {
    // queryDonor('123').then(response => {
    //   console.log(response)
    // }).catch(error => {
    //   console.log(error)
    // })
  }

  createCharitableAsset() {
    
  }
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }
  render() {
    const { match, routerData, location } = this.props;
    return (
      <PageHeaderLayout
        title="Deposit"
        tabActiveKey={location.pathname}
        content="Deposit money to your account for donation"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="Info" />
              <Step title="Confirm" />
              <Step title="Result" />
            </Steps>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/step-form" to="/step-form/info" />
              <Route render={NotFound} />
            </Switch>
          </Fragment>
        </Card>
      </PageHeaderLayout>
    );
  }
}
