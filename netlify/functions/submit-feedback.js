
import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
         
  type: "service_account",
  project_id: "feedbackcollector-38822",
  private_key_id: "a0d108db63004196f27c5a72f17c4e1c2441eaaf",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCwf5TD/uN8Fv2I\nmxRFxx3wg2U3qUzUUkjVxRGndB0+3D0lGunN6ysHsc1OVOKcagKBIVAcosOTjaz9\nWOngRAJsT9eLyPtZU7TlizNXZA7Ras91CZQPtQMABTPu+1xcODC/qjTnAycs8I0W\nTFnVE7fLE9gmmD6AI7mQrZSMzb5q7Tos8hWCBY9h9ew1FL0nH4J0v0hEPD7Fs+nO\nJylsIQHUfLKqwzIzbV7P0Pj4jYMVholD3wbt7ZK9V2hft6vAYmuReO894qyyFJTf\naRrqexUhm0I3DLDxM0oaEnml8+zJ1s8OVWd+B2W++xxJhHpdu4AGllg8ounHAg6J\n4fAfnWNXAgMBAAECggEAHS/D1JNyX+NXYr8uX4mZYFwCIW28OEIxLDSOAlB3w5zc\n+aVVM4mnkHqtFj6ASNhY+KyfGFUsHVro1+5boovskKe1X7bJJdDrUaguwc1Yi/Xr\nP5Hpa52F1PuHRoZHlDJwkUlevTLuyAYxdpYCpvM/SfRKors7XqpJteyWa6BcVEcH\nKrCVVimi/4uTwxJtcQ2t2VOvzKBhwfPpc5yCQySmRcbxMt5ud/K3ZeH6WwUi0yJ/\nLXjrioQnuzyO0za64h+iCDdJ8mFw86IXxqZtp+W58pZmk0sAAIAnOvRZIXm/8Wfh\n5XFF0+UnVRadN8t4e0eI9Wv7yArJb53bEc+9DpdloQKBgQDaqXRvS/90HJdMKKNx\ndIQLhNliy9U7xHlgz8A79nsD5nQWvJBTXrC9IgZJRkNdi+WSaKOCAe+IlPDkhur7\niyeecpAUB1XljtRPd8SOMJFFw/+3e26aiMvMiKsGWvsqbrUYJvNlhUDIAlcuftcY\nvVPqVjbeTeijnBqqCf37YFnsoQKBgQDOov8JUmHfeu4VkB3+Vk194blj39ZkBeDM\ncea2SZuct21SGvh1NaDtTSWEkzoxoCH0daIhqj+hmVc38aj7WhpOUrdXZmwBusJt\nwbsl/+g7JNwtxugrg4e0fGEC7b1gT32GWoXS17Gxm9rOfsCyhmKMNLP3XPHeRRfr\nPtpJO+2U9wKBgA1/1K5iVL0IXtbW03BXryc+5mTRDLMJ6Cxv5wBMsT+GZLhan9Zl\nzCeBCD5R1iraTiwBxcZq9CzMdSrGoY8yAhooHHkAEu9/J+BYFoxoty9FcG4Vcrib\npWlVLqnPyB3Qg+Gf1fr4hQ1UB6nZLtJaLeoTtIN479nZ81N4FnQEeMjBAoGAUSuW\nI4NJDxCrFa1XGuGr7xcMTD9RaFkmxSi5CEJB7n3fY7FUiDZY0N7NLhbndTcCH5VV\n6wOFm2Uw7bjwOExcqQe1HZAOPV+voI3JhlPQVetU0magLPeuBygUs6HQElUnae+F\nQh2Yn7wpZ5RC/d3sOEc7qp/IIxfhHXfDJ6Fy4mECgYBXQA3pnMBr3z4Z4RLd9B4h\n6cIbXVyCC+TSgDRdTlxExh3o151EinKbtrOGMjM6By4Wclxzjq25KAiIyw3z1MxK\n7P536NpdpL9UfcwimCG3C/NJFG+JQ+7HPCbjPtXi5VCg9xjfTPJ430koP+q7QjrL\nrwCCkOkpkxvkLPtahq/BXQ==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@feedbackcollector-38822.iam.gserviceaccount.com",
 client_id: "113456588101115924949",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40feedbackcollector-38822.iam.gserviceaccount.com",
    }),
  });
}

const db = admin.firestore();
export const handler = async (event) => {


  try {
    const { name, email, message } = JSON.parse(event.body);
    const feedbackRef = db.collection('feedbacks');

    await feedbackRef.add({
      name,
      email,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Feedback submitted successfully!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error submitting feedback' }),
    };
  }
};
