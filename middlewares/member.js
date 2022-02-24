const {Board} = require('../apis/models');

const checkMember = (...roles) => async(req, res, next) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }
    const board = await Board.findById(req.headers.idboard);

    if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
    }

    const found = board.members.some((member) => member.user.equals(req.user._id))
    if(!found){
        return res.status(403).send('You are not allowed to make this request.');
    }
    board.members.forEach(member => {
        if(member.user.equals(req.user._id)){
            const hasRole = roles.find(role => member.role === role);
            if (!hasRole) {
                return res.status(403).send('You are not allowed to make this request.');
            }
            return next();
        }
    });
}

module.exports = checkMember;
