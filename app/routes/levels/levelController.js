import async from 'async';
import {
  logger,
} from '../../../log';
import Level from '../../models/level';
import Team from '../../models/team';
import constraints from '../../helper/constraints';
import config from '../../../config';

const getAliasLevel = (user, alias, callback) => {
  const tasks = [
    (callback) => {
      if (!user.team_id) {
        return callback('Player dont belong from any team', null);
      }
      Team.findById(user.team_id, (err, team) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        return callback(null, team);
      });
    },

    (team, callback) => {
      Level.findOne({
        sub_levels: {
          $elemMatch: {
            url_alias: alias,
          },
        },
      }, {
        'sub_levels.$': 1,
      }, constraints.ansContraint,
      (err, level) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        if (!level) {
          return ('no level found', null);
        }
        if (level.sub_levels.length) {
          return callback(null, { level, team });
        }
        return callback('No level found', null);
      });
    },

    (data, callback) => {
      Level.findById(data.level._id, (err, level) => {
        if (err) {
          return callback(err, null);
        }
        const teamLevelNo = data.team.level_no;
        const teamSubLevelNo = data.team.sub_levels;
        if (level.level_no > teamLevelNo) {
          return callback('access denied', null);
        }
        if (level.level_no === teamLevelNo) {
          if (data.level.sub_levels.filter(o => o.url_alias === alias)[0].sub_level_no > teamSubLevelNo) {
            return callback('access denied', null);
          }
        }

        return callback(null, {
          level,
          teamLevelNo,
          teamSubLevelNo,
        });
      });
    },
  ];

  async.waterfall(tasks, (err, response) => {
    if (err) {
      logger.error(err);
      return callback(err, null);
    }
    return callback(null, response);
  });
};


const getAllLevels = (user, callback) => {
  const tasks = [
    (callback) => {
      Team.findById(user.team_id, (err, team) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        if (!team) {
          return callback('NO TEAM FOUND', null);
        }
        return callback(null, team);
      });
    },

    (team, callback) => {
      const queryCondition = !user.admin ? {
        level_no: {
          $lte: team.level_no,
        },
      } : {};
      Level.find(queryCondition,
        constraints.levelRetrieveInfo, (err, levels) => {
          if (err) {
            logger.error(err);
            return callback(err, null);
          }
          // this is a hack can fail in some cases
          levels.map((l) => {
            l.sub_levels = l.sub_levels.sort((a, b) => a.sub_level_no > b.sub_level_no);
            l.sub_levels = l.sub_levels[0];
          });
          // console.log(levels);
          return callback(null, levels);
        });
    },
  ];

  async.waterfall(tasks, (err, response) => {
    if (err) {
      logger.error(err);
      return callback(err, null);
    }
    return callback(null, response);
  });
};

const getLevelAlias = (levelNo, subLevelNo, callback) => {
  Level.findOne({
    level_no: levelNo,
  }, {
    sub_levels: {
      $elemMatch: {
        sub_level_no: subLevelNo,
      },
    },
  }, constraints.levelRetrieveInfo, (err, level) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, level);
  });
};

const cryptoJSON = require('crypto-json');

const cipher = 'aes256';
const encoding = 'hex';

const encryptLevel = (data) => {
  const object = {};
  object.url_alias = data.url_alias;
  object.name = data.name;
  object.sub_level_no = data.sub_level_no;
  object.picture = data.picture;
  object.html = data.html.replace(/\\/g, '');
  object.js = data.js.replace(/\\/g, '');
  return cryptoJSON.encrypt(object, config.app.key, {
    algorithm: cipher,
    encoding,
    keys: [],
  });
};

export default {
  encryptLevel,
  getAliasLevel,
  getAllLevels,
  getLevelAlias,
};
