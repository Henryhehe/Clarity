import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList, getCharity } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// Constant for our personas set up

const credentials = {
  donor: {
    userName: 'donor',
    password: '123456',
  },
  charity: {
    userName: 'charity',
    password: '123456',
  },
  government: {
    userName: 'government',
    password: '123456',
  },
  beneficiary: {
    userName: 'beneficiary',
    password: '123456',
  },
};

// whether to disable proxy
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // Get current user info
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Admin',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  'GET /api/currentUser/donor': {
    $desc: 'donor user info',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Donor',
      avatar:
        'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77ac65f35be1387aab93df29a65ab104&auto=format&fit=crop&w=1241&q=80',
      userid: '00000002',
      notifyCount: 12,
    },
  },
  'GET /api/currentUser/charity': {
    $desc: 'charity user info',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Charity',
      avatar:
        'https://images.unsplash.com/photo-1495078065017-564723e7e3e7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=09093dcdf66dbcd2397b9dc19384a899&auto=format&fit=crop&w=1400&q=80',
      userid: '00000003',
      notifyCount: 12,
    },
  },
  'GET /api/currentUser/government': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Government',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=99c6d2880c20cb72f29b5a9eba8ea898&auto=format&fit=crop&w=1650&q=80',
      userid: '00000004',
      notifyCount: 12,
    },
  },
  'GET /api/currentUser/beneficiary': {
    $desc: 'Beneficiary user info',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Beneficiary',
      avatar:
        'https://images.unsplash.com/photo-1517945577684-acd9255116a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a23bd585f1e17373f54edabb0bf503f9&auto=format&fit=crop&w=668&q=80',
      userid: '00000005',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  //to Get charity list
  'GET /api/charity': getCharity,
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    //////////// our own mock up credentials
    if (password === credentials['donor'].password && userName === 'donor') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'donor',
      });
      return;
    }
    if (password === credentials['charity'].password && userName === 'charity') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'charity',
      });
      return;
    }
    if (password === credentials['government'].password && userName === 'government') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'government',
      });
      return;
    }
    if (password === credentials['beneficiary'].password && userName === 'beneficiary') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'beneficiary',
      });
      return;
    }
    //////////////////////
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

export default (noProxy ? {} : delay(proxy, 1000));
