import { parse } from 'url';

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];

const charity_titles = [
  'Compassion Canada',
  'Federation CJA',
  'Movember Canada',
  'Operation Enfant Soleil',
  'World Vision Canada',
  'Private Giving Foundation',
  'Vancouver Foundation',
  'University Hospital Foundation',
];

const environmentCharity = [
  {
    name: 'World Wildlife Fund Canada/Fonds Mondial Pour La Nature Canada',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B-',
    fundraisingEfficiency: 'B+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'WWF-Canada creates science-based solutions to the environmental challenges that matter most for Canadians. We work in places that are unique and ecologically important, so that nature, wildlife and people thrive together. We envision: A vibrant healthy and secure future for the Arctic, all freshwater systems in good condition, healthy marine ecosystems on all three coasts, resilient communities across the country that enhance, rather than harm, the natural environment',
  },
  {
    name: 'Nature Conservancy of Canada',
    type: 'environment',
    website: 'www.natureconservancy.ca',
    efficiency: '83.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A-',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'A-',
    Mission:
      '	The Nature Conservancy of Canada (NCC) leads and inspires others to join us in creating a legacy for future generations by conserving important natural areas and biological diversity across all regions of Canada. We envision a world in which Canadians conserve nature in all its diversity, and safeguard the lands and waters that sustain life.',
  },
  {
    name: 'Habitat for Humanity Canada',
    type: 'environment',
    website: 'www.habitat.ca',
    efficiency: '81.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'N.A.',
    FinalGrade: 'N.A.',
    Mission: '',
  },
  {
    name: 'Ducks Unlimited Canada',
    type: 'environment',
    website: 'www.ducks.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B',
    fundraisingEfficiency: 'B',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'B+',
    Mission:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.',
  },
];

const fundraisingCharity = [
  {
    name: 'World Wildlife Fund Canada/Fonds Mondial Pour La Nature Canada',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B-',
    fundraisingEfficiency: 'B+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'WWF-Canada creates science-based solutions to the environmental challenges that matter most for Canadians. We work in places that are unique and ecologically important, so that nature, wildlife and people thrive together. We envision: A vibrant healthy and secure future for the Arctic, all freshwater systems in good condition, healthy marine ecosystems on all three coasts, resilient communities across the country that enhance, rather than harm, the natural environment',
  },
  {
    name: 'Nature Conservancy of Canada',
    type: 'environment',
    website: 'www.natureconservancy.ca',
    efficiency: '83.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A-',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'A-',
    Mission:
      '	The Nature Conservancy of Canada (NCC) leads and inspires others to join us in creating a legacy for future generations by conserving important natural areas and biological diversity across all regions of Canada. We envision a world in which Canadians conserve nature in all its diversity, and safeguard the lands and waters that sustain life.',
  },
  {
    name: 'Habitat for Humanity Canada',
    type: 'environment',
    website: 'www.habitat.ca',
    efficiency: '81.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'N.A.',
    FinalGrade: 'N.A.',
    Mission: '',
  },
  {
    name: 'Ducks Unlimited Canada',
    type: 'environment',
    website: 'www.ducks.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B',
    fundraisingEfficiency: 'B',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'B+',
    Mission:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.',
  },
];

const healthCharity = [
  {
    name: 'World Wildlife Fund Canada/Fonds Mondial Pour La Nature Canada',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B-',
    fundraisingEfficiency: 'B+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'WWF-Canada creates science-based solutions to the environmental challenges that matter most for Canadians. We work in places that are unique and ecologically important, so that nature, wildlife and people thrive together. We envision: A vibrant healthy and secure future for the Arctic, all freshwater systems in good condition, healthy marine ecosystems on all three coasts, resilient communities across the country that enhance, rather than harm, the natural environment',
  },
  {
    name: 'Nature Conservancy of Canada',
    type: 'environment',
    website: 'www.natureconservancy.ca',
    efficiency: '83.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A-',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'A-',
    Mission:
      '	The Nature Conservancy of Canada (NCC) leads and inspires others to join us in creating a legacy for future generations by conserving important natural areas and biological diversity across all regions of Canada. We envision a world in which Canadians conserve nature in all its diversity, and safeguard the lands and waters that sustain life.',
  },
  {
    name: 'Habitat for Humanity Canada',
    type: 'environment',
    website: 'www.habitat.ca',
    efficiency: '81.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'N.A.',
    FinalGrade: 'N.A.',
    Mission: '',
  },
  {
    name: 'Ducks Unlimited Canada',
    type: 'environment',
    website: 'www.ducks.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B',
    fundraisingEfficiency: 'B',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'B+',
    Mission:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.',
  },
];

const hospitalCharity = [
  {
    name: 'World Wildlife Fund Canada/Fonds Mondial Pour La Nature Canada',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B-',
    fundraisingEfficiency: 'B+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'WWF-Canada creates science-based solutions to the environmental challenges that matter most for Canadians. We work in places that are unique and ecologically important, so that nature, wildlife and people thrive together. We envision: A vibrant healthy and secure future for the Arctic, all freshwater systems in good condition, healthy marine ecosystems on all three coasts, resilient communities across the country that enhance, rather than harm, the natural environment',
  },
  {
    name: 'Nature Conservancy of Canada',
    type: 'environment',
    website: 'www.natureconservancy.ca',
    efficiency: '83.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A-',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'A-',
    Mission:
      '	The Nature Conservancy of Canada (NCC) leads and inspires others to join us in creating a legacy for future generations by conserving important natural areas and biological diversity across all regions of Canada. We envision a world in which Canadians conserve nature in all its diversity, and safeguard the lands and waters that sustain life.',
  },
  {
    name: 'Habitat for Humanity Canada',
    type: 'environment',
    website: 'www.habitat.ca',
    efficiency: '81.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'N.A.',
    FinalGrade: 'N.A.',
    Mission: '',
  },
  {
    name: 'Ducks Unlimited Canada',
    type: 'environment',
    website: 'www.ducks.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B',
    fundraisingEfficiency: 'B',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'B+',
    Mission:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.',
  },
];

const internationalCharity = [
  {
    name: 'World Wildlife Fund Canada/Fonds Mondial Pour La Nature Canada',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B-',
    fundraisingEfficiency: 'B+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'WWF-Canada creates science-based solutions to the environmental challenges that matter most for Canadians. We work in places that are unique and ecologically important, so that nature, wildlife and people thrive together. We envision: A vibrant healthy and secure future for the Arctic, all freshwater systems in good condition, healthy marine ecosystems on all three coasts, resilient communities across the country that enhance, rather than harm, the natural environment',
  },
  {
    name: 'Nature Conservancy of Canada',
    type: 'environment',
    website: 'www.natureconservancy.ca',
    efficiency: '83.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A-',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'A-',
    Mission:
      '	The Nature Conservancy of Canada (NCC) leads and inspires others to join us in creating a legacy for future generations by conserving important natural areas and biological diversity across all regions of Canada. We envision a world in which Canadians conserve nature in all its diversity, and safeguard the lands and waters that sustain life.',
  },
  {
    name: 'Habitat for Humanity Canada',
    type: 'environment',
    website: 'www.habitat.ca',
    efficiency: '81.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'N.A.',
    FinalGrade: 'N.A.',
    Mission: '',
  },
  {
    name: 'Ducks Unlimited Canada',
    type: 'environment',
    website: 'www.ducks.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B',
    fundraisingEfficiency: 'B',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'B+',
    Mission:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.',
  },
];

const religionCharity = [
  {
    name: 'World Wildlife Fund Canada/Fonds Mondial Pour La Nature Canada',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B-',
    fundraisingEfficiency: 'B+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'WWF-Canada creates science-based solutions to the environmental challenges that matter most for Canadians. We work in places that are unique and ecologically important, so that nature, wildlife and people thrive together. We envision: A vibrant healthy and secure future for the Arctic, all freshwater systems in good condition, healthy marine ecosystems on all three coasts, resilient communities across the country that enhance, rather than harm, the natural environment',
  },
  {
    name: 'Nature Conservancy of Canada',
    type: 'environment',
    website: 'www.natureconservancy.ca',
    efficiency: '83.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A-',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'A-',
    Mission:
      '	The Nature Conservancy of Canada (NCC) leads and inspires others to join us in creating a legacy for future generations by conserving important natural areas and biological diversity across all regions of Canada. We envision a world in which Canadians conserve nature in all its diversity, and safeguard the lands and waters that sustain life.',
  },
  {
    name: 'Habitat for Humanity Canada',
    type: 'environment',
    website: 'www.habitat.ca',
    efficiency: '81.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'N.A.',
    FinalGrade: 'N.A.',
    Mission: '',
  },
  {
    name: 'Ducks Unlimited Canada',
    type: 'environment',
    website: 'www.ducks.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B',
    fundraisingEfficiency: 'B',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'B+',
    Mission:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.',
  },
];

const socialCharity = [
  {
    name: 'World Wildlife Fund Canada/Fonds Mondial Pour La Nature Canada',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B-',
    fundraisingEfficiency: 'B+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'WWF-Canada creates science-based solutions to the environmental challenges that matter most for Canadians. We work in places that are unique and ecologically important, so that nature, wildlife and people thrive together. We envision: A vibrant healthy and secure future for the Arctic, all freshwater systems in good condition, healthy marine ecosystems on all three coasts, resilient communities across the country that enhance, rather than harm, the natural environment',
  },
  {
    name: 'Nature Conservancy of Canada',
    type: 'environment',
    website: 'www.natureconservancy.ca',
    efficiency: '83.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A-',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'A-',
    Mission:
      '	The Nature Conservancy of Canada (NCC) leads and inspires others to join us in creating a legacy for future generations by conserving important natural areas and biological diversity across all regions of Canada. We envision a world in which Canadians conserve nature in all its diversity, and safeguard the lands and waters that sustain life.',
  },
  {
    name: 'Habitat for Humanity Canada',
    type: 'environment',
    website: 'www.habitat.ca',
    efficiency: '81.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'N.A.',
    FinalGrade: 'N.A.',
    Mission: '',
  },
  {
    name: 'Ducks Unlimited Canada',
    type: 'environment',
    website: 'www.ducks.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B',
    fundraisingEfficiency: 'B',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'B+',
    Mission:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.',
  },
];

const otherCharity = [
  {
    name: 'World Wildlife Fund Canada/Fonds Mondial Pour La Nature Canada',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B-',
    fundraisingEfficiency: 'B+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'WWF-Canada creates science-based solutions to the environmental challenges that matter most for Canadians. We work in places that are unique and ecologically important, so that nature, wildlife and people thrive together. We envision: A vibrant healthy and secure future for the Arctic, all freshwater systems in good condition, healthy marine ecosystems on all three coasts, resilient communities across the country that enhance, rather than harm, the natural environment',
  },
  {
    name: 'Nature Conservancy of Canada',
    type: 'environment',
    website: 'www.natureconservancy.ca',
    efficiency: '83.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A-',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'A-',
    Mission:
      '	The Nature Conservancy of Canada (NCC) leads and inspires others to join us in creating a legacy for future generations by conserving important natural areas and biological diversity across all regions of Canada. We envision a world in which Canadians conserve nature in all its diversity, and safeguard the lands and waters that sustain life.',
  },
  {
    name: 'Habitat for Humanity Canada',
    type: 'environment',
    website: 'www.habitat.ca',
    efficiency: '81.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'N.A.',
    FinalGrade: 'N.A.',
    Mission: '',
  },
  {
    name: 'Ducks Unlimited Canada',
    type: 'environment',
    website: 'www.ducks.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B',
    fundraisingEfficiency: 'B',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'B+',
    Mission:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.',
  },
];

const avatars = [
  'https://www.spellbrand.com/images/blog/images/nature-conservancy-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/international-red-cross-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/wwf-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/united-nations-childrens-fund-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/save-the-children-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/grantscape-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/habitat-for-humanity-international-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/boys-girls-clubs-of-america-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/barnardos-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/susan-g-komen-logo-design-trend.jpg',
];

const avatars2 = [
  'https://www.spellbrand.com/images/blog/images/nature-conservancy-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/international-red-cross-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/wwf-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/united-nations-childrens-fund-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/save-the-children-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/grantscape-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/habitat-for-humanity-international-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/boys-girls-clubs-of-america-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/barnardos-logo-design-trend.jpg',
  'https://www.spellbrand.com/images/blog/images/susan-g-komen-logo-design-trend.jpg',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];
export function fakeCharity(count) {
  const list = [];
}
export function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - i % 4],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    });
  }
  return list;
}

export function getFakeList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export const getCharity = [
  {
    name: 'The World Wide Fund for Nature ',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '89.0%',
    efficiencyGrade: 'A',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'Our Mission. To stop the degradation of the planets natural environment and to build a future in which humans live in harmony with nature, by: conserving the worlds biological diversity. ensuring that the use of renewable natural resources is sustainable.',
  },
  {
    name: 'World Wildlife Fund Canada/Fonds Mondial Pour La Nature Canada',
    type: 'environment',
    website: 'www.wwf.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B-',
    fundraisingEfficiency: 'B+',
    reserveGrade: 'A',
    governanceGrade: 'B',
    FinalGrade: 'B',
    Mission:
      'WWF-Canada creates science-based solutions to the environmental challenges that matter most for Canadians. We work in places that are unique and ecologically important, so that nature, wildlife and people thrive together. We envision: A vibrant healthy and secure future for the Arctic, all freshwater systems in good condition, healthy marine ecosystems on all three coasts, resilient communities across the country that enhance, rather than harm, the natural environment',
  },
  {
    name: 'Nature Conservancy of Canada',
    type: 'environment',
    website: 'www.natureconservancy.ca',
    efficiency: '83.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A-',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'A-',
    Mission:
      '	The Nature Conservancy of Canada (NCC) leads and inspires others to join us in creating a legacy for future generations by conserving important natural areas and biological diversity across all regions of Canada. We envision a world in which Canadians conserve nature in all its diversity, and safeguard the lands and waters that sustain life.',
  },
  {
    name: 'Habitat for Humanity Canada',
    type: 'environment',
    website: 'www.habitat.ca',
    efficiency: '81.0%',
    efficiencyGrade: 'A-',
    fundraisingEfficiency: 'A+',
    reserveGrade: 'A',
    governanceGrade: 'N.A.',
    FinalGrade: 'N.A.',
    Mission: '',
  },
  {
    name: 'Ducks Unlimited Canada',
    type: 'environment',
    website: 'www.ducks.ca',
    efficiency: '73.0%',
    efficiencyGrade: 'B',
    fundraisingEfficiency: 'B',
    reserveGrade: 'A',
    governanceGrade: 'A',
    FinalGrade: 'B+',
    Mission:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.',
  },
];

export const getNotice = [
  {
    id: 'xxx1',
    title: charity_titles[0],
    logo: avatars[0],
    description:
      'Our Missions is to “Conserve, restore and manage wetlands and associated habitats for the benefit of North America’s waterfowl. These habitats benefit other wildlife and people.”',
    member: 'ENVIRONMENT',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: charity_titles[1],
    logo: avatars[1],
    description: 'Inspiring the community to engage in building a healthier future',
    member: 'FUNDRAISING ORGANIZATIONS',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: charity_titles[2],
    logo: avatars[2],
    description:
      'The mission of the Foundation is to support excellence in care at The Montreal Children’s Hospital of the McGill University Health Centre.',
    member: 'HOSPITAL FOUNDATIONS',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: charity_titles[3],
    logo: avatars[3],
    description:
      'The Canadian Cancer Society is a national, community-based organization of volunteers whose mission is the eradication of cancer and the enhancement of the quality of life of people living with cancer.',
    member: 'HEALTH/HEALTH SERVICES',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: charity_titles[4],
    logo: avatars[4],
    description:
      '	Christian Children’s Fund of Canada creates a future of hope for children, families and communities by helping them develop the skills and resources to overcome proverty and pursue justice. For more than 50 years, we have followed the example of Christ by serving the poor regardless of their faith, cultural and ethnic background.',
    member: 'INTERNATIONAL AID & DEVELOPMENT',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: charity_titles[5],
    logo: avatars[5],
    description:
      '	To develop within our children the quest for a brighter future. Working with children from financially disadvantaged homes, we deliver programs designed to increase self-confidence, self-esteem and build personal leadership skills.',
    member: 'SOCIAL SERVICES',
    href: '',
    memberLink: '',
  },
];

export const getActivities = [
  {
    id: 'trend-1',
    user: {
      name: 'The World Wide Fund for Nature',
      avatar: 'https://www.spellbrand.com/images/blog/images/wwf-logo-design-trend.jpg',
    },
    date: {
      name: '02/02/2018',
    },
    template: 'issued receipt on @{date}',
  },
  {
    id: 'trend-2',
    user: {
      name: 'Compassion Canada',
      avatar: avatars2[0],
    },
    date: {
      name: '02/04/2017',
    },
    template: 'issued receipt on @{date}',
  },
  {
    id: 'trend-3',
    user: {
      name: 'Cystic Fibrosis Canada',
      avatar: avatars2[1],
    },
    date: {
      name: '01/03/2018',
    },
    template: 'issued receipt on @{date}',
  },
];

export default {
  getNotice,
  getActivities,
  getFakeList,
  getCharity,
};
