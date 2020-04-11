import axios from 'axios';
import {notification} from 'ant-design-vue';

function request(options) {
  return axios(options).then(res => {
    return res
  }).catch(error => {
    console.log(11)
    const {response:{status,statusText}} = error;
    notification.error({
      // eslint-disable-next-line no-unused-vars
      message: status,
      description: statusText,
    })
    return Promise.reject(error)
  })
}
export default request


// cnpm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props --save
// 在babelrc的presets中引入'@vue/babel-preset-jsx'
