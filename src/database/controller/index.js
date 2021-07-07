import { db, auth, storage } from '../config';


class ControllerDb { 
    async logout() {
        await auth.signOut();
    }
    async sendSolicitation(data) {
        let _db = db.ref('solicitacao');
        let request = await _db.push(data);
        return request; 
    } 
    async login(user, password) {
        let request = await auth.signInWithEmailAndPassword(user, password);
        return request;
    }
    async toggleConfirm(id, state) {
        let _db = db.ref('solicitacao');
        let result = await _db.child(id).update({ ok: state });
        return result;
    }
    async uploadProject(file, content) {
        await storage.ref(`galeria/${file.name}`).put(file);
        return storage.ref(`galeria`).child(file.name).getDownloadURL().then(url => {
            let data = {
                titulo: content.titulo,
                descricao: content.descricao,
                nomeimagem: file.name,
                imagem: url,
                data: new Date().toLocaleDateString(),
                hora: new Date().toLocaleTimeString()
            }
            db.ref('galeria').push(data);
        })
    }
    async deleteProject(id) {
        let request = await db.ref('galeria').child(id).remove();
        return request;
    }
    async deleteMenssager(id) {
        let request = await db.ref('solicitacao').child(id).remove();
        return request;
    }
    async updateProject(id, content) {
        let request = await db.ref('galeria').child(id).update(content);
        return request;
    }
    async cretaeUser(file, content) {
        await auth.createUserWithEmailAndPassword(content.emailcad, content.senhacad)
        await storage.ref(`perfil/${file.name}`).put(file);
        return storage.ref('perfil').child(file.name).getDownloadURL().then(url => {
            let currentUser = auth.currentUser;
            let data = {
                email: content.emailcad,
                nome: content.nomecad,
                nomecompleto: content.nomecompletocad,
                perfil: url
            }
            db.ref('usuarios').child(currentUser.uid).push(data);
        });
    }
}

export default new ControllerDb();