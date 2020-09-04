import React, { useEffect, useState } from 'react'
import firebaseApp from './../../firebase'
import StarRatings from 'react-star-ratings'
import './appbody.css'
const Appbody = () => {
    const [userApps, setuserApps] = useState([])
    const [isLoading, setisLoading] = useState(false)

    // Get users from firebase database on initial load
    useEffect(() => {
        setisLoading(true)
        const usersRef = firebaseApp.database().ref('users');
        const accountRef = firebaseApp.database().ref('accounts')
        Promise.all([getUsers(usersRef), getAccounts(accountRef)])
            .then(results => {
                let users = results[0]['users']
                let accounts = results[1]['accounts']
                getUserApps(users, accounts)
                setisLoading(false)
            })
            .catch(error => {
                console.log(error)
                window.alert('Error')
                setisLoading(false)
            })
    }, [])

    // Get user apps residing the accounts collection
    const getUserApps = (users = [], accounts = []) => {
        let allUserApps = []
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < accounts.length; j++) {
                if (users[i]['accountId'] == accounts[j]['accountId']) {
                    // If in case, we have multiple apps
                    let appKeys = Object.keys(accounts[j]['apps'])
                    for (let k = 0; k < appKeys.length; k++) {
                        let appKey = appKeys[k]

                        // We will a create a custom array of objects containing following data
                        allUserApps.push({
                            'userName': users[i]['user'],
                            'userId': users[i]['userId'],
                            'appName': accounts[j]['apps'][appKey]['title'],
                            'accountId': accounts[j]['accountId'],
                            'ratings': accounts[j]['apps'][appKey]['ratings'] || 0,
                            'appId': appKey
                        })
                    }
                }
            }
        }
        // console.log(allUserApps)
        // update the states
        setuserApps(allUserApps.map(app => app))
    }

    // Get all the users from Users collections of the Realtime database
    const getUsers = (usersRef) => {
        return new Promise((resolve, reject) => {
            usersRef.on('value', (snapshot) => {
                let users = snapshot.val()
                let newState = []
                for (let user in users) {
                    newState.push({
                        'userId': user,
                        'user': users[user]['name'],
                        'accountId': users[user]['account']
                    })
                }
                if (newState) {
                    resolve({ 'users': newState })
                }
                else {
                    reject({ 'error': 'No Users' })
                }
            })
        })
    }

    // Get all the accounts from Accounts collection of the Realtime database
    const getAccounts = (accountsRef) => {
        return new Promise((resolve, reject) => {
            accountsRef.on('value', (snapshot) => {
                let accounts = snapshot.val()
                let newState = []
                for (let account in accounts) {
                    newState.push({
                        'apps': accounts[account]['apps'],
                        'accountId': account
                    })
                }
                if (newState) {
                    resolve({ 'accounts': newState })
                }
                else {
                    reject({ 'error': 'No Accounts' })
                }
            })
        })
    }

    // Update the ratings for apps
    const updateRatings = (app, ratings) => {
        // Update the Realtime database 
        const userRef = firebaseApp.database().ref(`accounts/${app['accountId']}/apps/${app['appId']}`)
        userRef.update({ 'ratings': ratings })

        // Update the state `userApps` to apply changes on UI
        let tempApps = userApps.map(app => app)
        for (let i = 0; i < tempApps.length; i++) {
            if (tempApps[i]['appId'] == app['appId']) {
                tempApps[i]['ratings'] = parseInt(ratings)
            }
        }
        // console.log(tempApps)
        setuserApps(tempApps.map(app => app))
    }

    // Loader
    const Loader = ({ isLoading }) => {
        return (
            <div className={'app__loader-div'}>
                {
                    isLoading ? (
                        <div className={'app_loader'}>
                            <div className={'app_loader-icon'}>
                                <i className={'fa fa-circle-o-notch fa-spin'}></i>
                                <h5>Loading...</h5>
                            </div>
                        </div>
                    ) : (null)
                }
            </div>
        )
    }
    return (
        <div className={'app-body__main'}>
            <Loader isLoading={isLoading} />
            <div className={'app-body__apps'}>
                <table className={'table table-striped text-left'}>
                    <thead>
                        <tr>
                            <th>
                                Account ID
                            </th>
                            <th>
                                User Name
                            </th>
                            <th>
                                App Name
                            </th>
                            <th>
                                Ratings
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userApps && userApps.length > 0 ? (
                                userApps.map((app, index) => <React.Fragment>
                                    <tr key={`user-app-${index + 1}`}>
                                        <td>
                                            {
                                                app['accountId']
                                            }
                                        </td>
                                        <td>
                                            {
                                                app['userName']
                                            }
                                        </td>
                                        <td>
                                            {
                                                app['appName']
                                            }
                                        </td>
                                        <td>
                                            <StarRatings
                                                rating={app['ratings']}
                                                numberOfStars={5}
                                                starRatedColor={'orange'}
                                                changeRating={(changeRating) => updateRatings(app, changeRating)}
                                                starDimension={'15px'}
                                            />
                                        </td>
                                    </tr>
                                </React.Fragment>)
                            ) : ('No Data')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Appbody