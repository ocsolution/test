import admin from 'firebase-admin';

const config = {
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'demo1-5844e',
    private_key_id: '1a6ae2f67ab518f3d67fefaf3ad8f9d85071dcc8',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD6PunqSUsTle2Y\n6nshNye9BdMX3+wB+eeoS+s5iBWcYDr+x66s6Q2G7i1TtSrnUGWMggKHpve2TZ4b\nVVNl4iTkILzcm1A417KlN4ZQrbGFoMQFkZJcR4MrJ8vzaUGDBqhkMsSSI+oANwu+\n2rOoMnr6+xNfMd8i48chIByaGXkOXKccY4Woa/vBLOSlPNJeHUFwyw7tevMT9aSR\nWe4lfx+hurs2oNamD8Hw7gh6poUsMt5mx9oFExZVu+VbJppASbOPPRqZ6pls9raJ\n46ngYfxNuZCLfm8XyZ+b8qPMm600c3fqu+3PfRHVXlF0wsoE1gPmaOlNCdB93hJJ\nIm/NVikpAgMBAAECgf9GItvsjh48nwi4kv9vj8XTdI51Yo0DAMeso5qJxVpJOa9P\nOSf7zlW8O4T4sQ4VRrMvbkDHRESpE5f8kS2OoJM2XPaR3fXd+JZZN/atJgFbMnO+\nG86pjmF09vJyhk2WK4eGjbQKQYaUCNmB5En2Gi/dqAEF7TRc0vo8joN1rS4Al+ld\nBJvbCKC2GMRh7A6yPCpSmo/8PbsCCpAh5q+HdbVXKybP/+kBa8hkpRALClN2kShn\n/7Jh4e3lLsV9xHQ4FFRtlbCKBhD5Bp1NuV/dxQRFcuOQBeeOskeLD3Xhyzxgh00b\ni68nP0huFISBzkRF6P2CtAgLZZtJObhtLwtRMC0CgYEA/mzjUaL8pGpt6/7oF8Iw\nuJctni6lHGSzxOqeUbpCOqG6RJB7LScJ1nQu/3GcWQ1KefDBCbs8KMPfgKXTZIgw\n3oVzzVHJEkLv93d2gF1pgxp6rs/vNJdmGUEs329WSgc7NWT8rakc/4wNZTRmxmGN\n/PRSDy2JC66J9cszHxQ1bHUCgYEA+8tnU7EUavr2WfNCNixGOiZB+cshx4Yl+AHX\n6WDoM1C4PaElwnQHkSrxJOiPi40A77TMd4OJGvZBfCvSETIuEMZM5V6PwgxDFxha\nr+EBz5O0DWY+LNWoyi6+njbmapg08qZnr9SOrqTJhyVWk9u81GKuVwJSvQVyanHJ\n9NhpA2UCgYEAyMEinUf+Eb3o/k4k1Jpl10FyvV4Q6laLgtWeFt7hY2I5l+BpUTd8\ni7shWm5K7/mMyqstpoAW+BOWR+yQ4MKVzP+AYIIoJkCrGJkq6B7NIqXCKC3qkZTk\n+whyX9t6Ou95yKfmuSC3wOzBpRmz/tT7NJ2UImXLvWv7b/bmX5+SiAECgYEA5bTu\nkr9drSs+S1lM8jb56lq0nbnfGzMauGKWIuaxbv8Y1cCJvhg0Pw855z3ylpEQZZ4/\nWli5X8uAelNP1Tg+JjeCN05JP/IH0q35LbLMAB7zh7XayvQwhCKY66WSF3S7+RIu\nTY5QjKrw30YE8ebpIajU+7O235J0iv88Cw7S3rECgYAd/ZfS/U6LCVYmwX0kuO8J\nhpAb+zNYLu5wgvAqypjW2SyVnppymy8qO/+pereu4XITcYr2jfVV/0MQVbe5UIpn\nvdv6ZCnVqk7NRKdgvT0OtvbkcK5CPjB/kxbI8FeiRHeiuLwaiwxtodIAEq/Ign/J\nZFwLTA4lDr0X4WfUbsjzXA==\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-7zuh5@demo1-5844e.iam.gserviceaccount.com',
    client_id: '112593871355721697698',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7zuh5%40demo1-5844e.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
  }),
};

export default defineEventHandler(async (event) => {
  const firebase = admin.apps.length ? admin.app() : admin.initializeApp(config);
  const bodyData = await readBody(event);

  const message = {
    tokens: bodyData.tokens ?? [],
    data: {},
    notification: {
      title: bodyData.title,
      body: bodyData.body,
    },
    android: {
      notification: {
        click_action: 'TOP_STORY_ACTIVITY',
      },
    },
    apns: {
      payload: {
        aps: {
          badge: 100,
          category: 'NEW_MESSAGE_CATEGORY',
        },
      },
    },
  };

  const resp = await firebase.messaging().sendEachForMulticast(message);
  return resp;
});
