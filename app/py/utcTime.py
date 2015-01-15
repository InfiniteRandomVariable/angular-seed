import datetime

current_time = datetime.datetime.now(datetime.timezone.utc)
unix_timestamp = current_time.timestamp()

print('Integer')
i_unix_timeStamp = int(unix_timestamp + 0.5)
print(int(i_unix_timeStamp/(60*30)))
##60*30

