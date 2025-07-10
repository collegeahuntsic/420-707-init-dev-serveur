const equipementController = require('../equipementController');
const equipementModel = require('../../models/equipementModel');

jest.mock('../../models/equipementModel');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('equipementController', () => {
    afterEach(() => jest.clearAllMocks());

    describe('getAllEquipements', () => {
        it('should return all equipements', () => {
            const fakeEquipements = [{ id: 1, nom: 'PC' }];
            equipementModel.getAllEquipements.mockReturnValue(fakeEquipements);

            const req = {};
            const res = mockRes();

            equipementController.getAllEquipements(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Liste des équipements récupérée avec succès',
                data: fakeEquipements
            });
        });
    });

    describe('getEquipementById', () => {
        it('should return equipement if found', () => {
            const fakeEquipement = { id: 1, nom: 'PC' };
            equipementModel.getEquipementById.mockReturnValue(fakeEquipement);

            const req = { params: { id: '1' } };
            const res = mockRes();

            equipementController.getEquipementById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Équipement trouvé',
                data: fakeEquipement,
            });
        });

        it('should return 404 if not found', () => {
            equipementModel.getEquipementById.mockReturnValue(undefined);

            const req = { params: { id: '2' } };
            const res = mockRes();

            equipementController.getEquipementById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 'error',
                message: 'Équipement non trouvé',
            });
        });
    });

    describe('createEquipement', () => {
        it('should create equipement with valid data', () => {
            const body = { nom: 'PC', type: 'ordinateur', etat: 'neuf', localId: 1 };
            const fakeEquipement = { id: 1, ...body };
            equipementModel.createEquipement.mockReturnValue(fakeEquipement);

            const req = { body };
            const res = mockRes();

            equipementController.createEquipement(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Équipement créé avec succès',
                data: fakeEquipement,
            });
        });

        it('should return 400 if missing fields', () => {
            const req = { body: { nom: 'PC' } };
            const res = mockRes();

            equipementController.createEquipement(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 'error',
                message: 'Champs manquants ou invalides',
            });
        });
    });

    describe('updateEquipement', () => {
        it('should update equipement if found', () => {
            const updated = { id: 1, nom: 'PC', type: 'ordinateur', etat: 'usagé', localId: 1 };
            equipementModel.updateEquipement.mockReturnValue(updated);

            const req = { params: { id: '1' }, body: { etat: 'usagé' } };
            const res = mockRes();

            equipementController.updateEquipement(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Équipement mis à jour avec succès',
                data: updated,
            });
        });

        it('should return 404 if equipement not found', () => {
            equipementModel.updateEquipement.mockReturnValue(undefined);

            const req = { params: { id: '2' }, body: { etat: 'usagé' } };
            const res = mockRes();

            equipementController.updateEquipement(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 'error',
                message: 'Équipement non trouvé pour mise à jour',
            });
        });
    });

    describe('deleteEquipement', () => {
        it('should delete equipement if found', () => {
            equipementModel.deleteEquipement.mockReturnValue(true);

            const req = { params: { id: '1' } };
            const res = mockRes();

            equipementController.deleteEquipement(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: `Équipement avec l'id 1 supprimé avec succès`
            });
        });

        it('should return 404 if equipement not found', () => {
            equipementModel.deleteEquipement.mockReturnValue(false);

            const req = { params: { id: '2' } };
            const res = mockRes();

            equipementController.deleteEquipement(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 'error',
                message: `Aucun équipement trouvé avec l'id 2`
            });
        });
    });

    describe('assignEquipementToLocal', () => {
        it('should assign equipement to local if found', () => {
            const updated = { id: 1, localId: 2 };
            equipementModel.assignEquipementToLocal.mockReturnValue(updated);

            const req = { params: { id: '1', localId: '2' } };
            const res = mockRes();

            equipementController.assignEquipementToLocal(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: `Équipement 1 assigné au local 2`,
                data: updated
            });
        });

        it('should return 404 if equipement not found', () => {
            equipementModel.assignEquipementToLocal.mockReturnValue(undefined);

            const req = { params: { id: '2', localId: '3' } };
            const res = mockRes();

            equipementController.assignEquipementToLocal(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 'error',
                message: `Aucun équipement trouvé avec l'id 2`
            });
        });
    });

    describe('getEquipementsByLocalId', () => {
        it('should return equipements for a local', () => {
            const equipements = [{ id: 1, localId: 2 }];
            equipementModel.getEquipementsByLocalId.mockReturnValue(equipements);

            const req = { params: { id: '2' } };
            const res = mockRes();

            equipementController.getEquipementsByLocalId(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: `Équipements trouvés pour le local 2`,
                data: equipements,
            });
        });

        it('should return 404 if no equipements for local', () => {
            equipementModel.getEquipementsByLocalId.mockReturnValue([]);

            const req = { params: { id: '3' } };
            const res = mockRes();

            equipementController.getEquipementsByLocalId(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 'error',
                message: `Aucun équipement trouvé pour le local avec l'id 3`,
            });
        });
    });
});