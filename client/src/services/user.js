import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryDonorUser() {
  return request('/api/currentUser/donor');
}

export async function queryGovernmentUser() {
  return request('/api/currentUser/government');
}

export async function queryCharityUser() {
  return request('/api/currentUser/charity');
}

export async function queryBeneficiaryUser() {
  return request('/api/currentUser/beneficiary');
}
