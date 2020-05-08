const bcrypt = require('bcryptjs')

const { User } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('User', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should encrypt user password', async () => {
        const passwordConst = '123456'

        const user = await User.create({
            name: 'Lemos Firmino',
            email: 'lemos@gmail.com',
            password: passwordConst
        })

        const compareHash = await bcrypt.compare(passwordConst, user.password_hash)

        expect(compareHash).toBe(true)
    })
})