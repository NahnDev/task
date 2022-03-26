import { UserType } from '../types/user.type';
import { Actions, CaslAbilityFactory, TaskAbility, UserAbility } from './ability-factory';

const user: UserType = { _id: 'rqr' };
const ability = CaslAbilityFactory.createForUser(user, []);
ability.can(Actions.Delete, TaskAbility);
// ability.can(Actions.Update, new UserAbility('23232'));
