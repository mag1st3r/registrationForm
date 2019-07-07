
export default  class ServicesAPI {
    _apiBase = `http://localhost:3001/`;


    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async addNewUser(obj) {
          const res =  await fetch(`${this._apiBase}users`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        return   await res.json();
    }


}


