# mat dash

Personal dashboard built with React,\
shows some info at a glance from various sources.

## Strava token

Open in browser:
```
https://www.strava.com/oauth/authorize?client_id=206403&redirect_uri=http://localhost&response_type=code&scope=read,activity:read_all
```

Then call:
```
curl -X POST https://www.strava.com/oauth/token \
  -d client_id=206403 \
  -d client_secret=SECRET \
  -d code=TOKEN \
  -d grant_type=authorization_code
```

```
curl -X POST https://www.strava.com/oauth/token \
  -d client_id=206403 \
  -d client_secret=YOUR_CLIENT_SECRET \
  -d refresh_token=YOUR_REFRESH_TOKEN \
  -d grant_type=refresh_token
```
