/**
 * @description Movie book services
 */

const SMSClient = require('@alicloud/sms-sdk')
const accessKeyId = 'LTAIoOYN62CdAepO'
const secretAccessKey = 'i1ALxwKQO52iRAn4JDvhklfkYYbgx4'
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

module.exports = {
  smsSend,
  getCode
}

function smsSend(phone, code) {
  return smsClient.sendSMS({
    PhoneNumbers: phone,
    SignName: '快乐影院',
    TemplateCode: 'SMS_136861789',
    TemplateParam: '{"code":"' + code + '"}'
  }).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
        console.log(res)
    }
  }, function (err) {
  console.log(err)  
})
}


function getCode() {
  const size = 6;
  let code = [];
  for (let i = 0; i < size; ++i) {
    code.push(Math.floor(Math.random() * 10));
  }
  return code.join('');
}

function getOption(phone, code) {
  return {
    sms_free_sign_name: config.sign_name,
    sms_type: config.sms_type,
    sms_param: {
        name: code
    },
    rec_num: phone,
    sms_template_code: config.template_code
  }
}