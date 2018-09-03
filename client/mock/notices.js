export const getNotices = (req, res) => {
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'You have received the receipt from your recent donation',
      datetime: '2017-08-09',
      type: '通知',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: 'Your recent donation has been transfered to the beneficiary',
      datetime: '2017-08-08',
      type: '通知',
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'You received a thank you letter!',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: 'Thanks for your recent donation!',
      description: 'Thanks for your recent donation to Compassion Canada',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: 'Please read',
      description: 'There has been issue with your donation',
      datetime: '2017-08-07',
      type: '消息',
    }
  ]);
};
export default {
  getNotices,
};
