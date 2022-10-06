import datetime
from flask import jsonify


def class2data(data_list,fields,type=0):
    '''class to dict'''
    if not type:
        user_list = []
        for u in data_list:
            temp = {}
            for f in fields:
                if f in ['create_time','login_time']:
                    temp[f] = datetime.datetime.strftime(getattr(u,f), "%Y-%m-%d %H:%M:%S ")
                else:
                    temp[f] = getattr(u,f)
            user_list.append(temp)
    else:
        user_list = {}
        for f in fields:
            if f in ['create_time', 'login_time']:
                d = getattr(data_list, f)
                if d:
                    user_list[f] = datetime.datetime.strftime(d, "%Y-%m-%d %H:%M:%S ")
            else:
                user_list[f] = getattr(data_list, f)

    return user_list

def create_response(status_code=0, msg="", data={}):
    '''返回一个Response对象'''
    response = {"status":status_code, "msg":msg, "data":data}
    return jsonify(response)
