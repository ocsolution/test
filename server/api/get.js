import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCr7joVVAGm/k8D
xJqYAxme5ByHpPIxETQVUfSma01HV0pdXwN4CObaywHCPGdqb26DoBPcXKNbN7C+
8Jl6WGTmTjcmVsanM2Q+ComUBl2S+gb86q/dLUnluA7ShWra1o8iYO/CWsL5ZYMT
I6Epq7nNvsqzIta19j3jiwM+6o3+f/Y+AdmZ0D4LYhGzL6UZXafK9fPDF1UfUCGU
vp3CQixlrNpzb/p0ApGlaFi/2q+qoEOf4twdFZ5kndxX6J9//Ly6fmImLXUXwn92
kvrix4ji7EsOWmfnEz2s0SjUPQL12JGXy+A+GZJaqBbmLXqYMXYkoLupOOnKgUdA
ZN6D1jM7AgMBAAECggEAC5C4XoPqoomb1hSNE6mtuQb+Nk+trQhLuR1suB8isShZ
i8Ne792lbdVXFnJKwJmjVP5ZJ6shn/q0jHuRz22PyAA97HnM3iVyWkwKKidtdvwT
qUK+NsIbpPTHJnksEXF6amUb67aARBeEhC6S4kM3efQaHYe76ryYOCy7OKm9iH+F
0JQokXJYW4r51gVG7Ao30HxX16LWywR/BpprT1xihNc5dmTIpvr1ZDcGVmgyl3fc
iSYC9oWoAmEfVymmM3/nMRwFr7x7qV1waSn1N+dujUkKUy1e2COAz7w1oVRoeuW4
ktrjQg4XADjKmxGk6y37txydL1cxMz/f1SOzt8yr5QKBgQDfXo+r0zvFI2EpxI3S
0KcX1xLrZI01JLagsj01LZ5T1R2SMKTga9T2zkTAF0TjNKm5YFPgr3+tX+javk+f
HAqN4cwwSTCUoDFAgr++g37F+1W2d4dyvTPccJrHbUBtO2olzMeI2YE5KzAB2p7b
Xh56NCXVJyenza7X1NQMFkLNzQKBgQDFC/yqlxzygrXx8wnxkK6sXa46dJ/gSOs0
dZleBlQ9TWrElMX9J++QnCyYFPDo9p56KZOQK+bq8rKkQ/l9/ISYLx7L/nvwan7w
He7psGYWzXsFHZA0kzhCIAS1sCb1LU94vPdiofvKFW/YqSwx1XllY2jpH7RffYdu
+93jgBs9JwKBgHgnEJd3793SczCZh0SQcmFzkrzGgOLGVerJFf2mBVXI/LgnrHj/
6DW+rOK7YZXqPSX3eAcTwFVNkx8fYgsPdWnuvPx4UkaQiQ3Phz7+0tHCqc+WKmkA
94WrmMaPsSlQ3X9p0Sd/AHD1F0TYCb2sui44IOWwwzcTf+qflFTQIK09AoGAFsvi
OWIuKShSIGG7vsS8UJit9XlUncAR5gnM6oHU8RqpxYBov3cFUjefOSEDFhCiGQQC
XGWX24qkfDiY/qheNrUM3RDeCdxoPyNXZpXP2cd/+gGHk22Mzqmhodt1Rlwtm4xR
Gooe9SwxumEoCcPmvYIYuw+98GY3avGcpBtIC3UCgYBT6jjrt2/z+jCwpZZEXkiv
GAVJ/szXfz3F5RoJuC/kP9tkrHIA0G2rxbUY9kUMK4OEgWP8Tn1zkbdFzXPUvja4
+LDpAeB1KWxgJGZZ1puUmEWh/XepsMXgLs8iiWYQlXnWUZhyojCqDEL0mPMPiXT9
Zl+/lNmq4+bhHoCoYXS34w==
-----END PRIVATE KEY-----`;
  const clientEmail = 'firebase-adminsdk-7zuh5@demo1-5844e.iam.gserviceaccount.com'; // Replace with your client_email
  const tokenUri = 'https://oauth2.googleapis.com/token';

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/firebase.messaging',
    aud: tokenUri,
    iat: now,
    exp: now + 3600 + 24,
  };

  const assertion = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

  return assertion;
});
