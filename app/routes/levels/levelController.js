import async from 'async';
import {
  logger,
} from '../../../log';
import Level from '../../models/level';
import Team from '../../models/team';

const levelValidator = (req, res, next) => {
  const tasks = [
    (callback) => {
      Team.findById(req.user.team_id, (err, team) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        req.team = team;
        return callback(null, team);
      });
    },

    (team, callback) => {
      Level.findOne({}, {
        sub_levels: {
          $elemMatch: {
            url_alias: req.query.alias,
          },
        },
      }, (err, level) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        // req.level = level;
        // const teamLevelNo = team.level_no;
        // const teamSubLevelNo = team.sub_levels;

        // if (level.level_no > teamLevelNo) {
        //   return callback('access denied', null);
        // }
        // if (level.sub_levels.length > teamSubLevelNo) {
        //   return callback('access denied', null);
        // }
        return callback(null, level);
      });
    },
  ];

  async.waterfall(tasks, (err, response) => {
    if (err) {
      logger(err);
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        data: response,
      });
    }
  });
};


export default {
  levelValidator,
};
