import userRepository from '../repositories/UserRepository.js';

class UserService {

    async getAll() {
        return userRepository.getAll();
    }

    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumer: user.phoneNumer,
            birthdate: user.birthdate,
            url_profile: user.url_profile,
            adress: user.adress,
            roles: user.roles.map(r => r.name),
            createdAt: user.createdAt
        };
    }

    async updateMe(id, data) {
        const allowedFields = ['name', 'lastName', 'phoneNumer', 'birthdate', 'url_profile', 'adress'];
        const updateData = {};
        for (const key of allowedFields) {
            if (data[key] !== undefined) updateData[key] = data[key];
        }
        const user = await userRepository.update(id, updateData);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumer: user.phoneNumer,
            birthdate: user.birthdate,
            url_profile: user.url_profile,
            adress: user.adress,
            roles: user.roles.map(r => r.name),
            createdAt: user.createdAt
        };
    }
}

export default new UserService();
