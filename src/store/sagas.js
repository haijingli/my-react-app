import { call, put, takeEvery } from 'redux-saga/effects'

const api = {
    login() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve({ id: 1, name: 'Tom' })
                } else {
                    reject(new Error("用户名或密码错误"))
                }
            }, 1000);
        })
    }
}

function* login() {
    try {
        const result = yield call(api.login);
        yield put({ type: 'login', result })
    } catch (error) {
        yield put({ type: 'login_failure', message: error.message })
    }
}

function* mySaga(){
    yield takeEvery('login_request',login)
}

export default mySaga;