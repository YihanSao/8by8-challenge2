import { UserType } from '../enums/user-type';
import type { Avatar } from './avatar';
import type { Badge } from './badge';

export interface User {
  uid: string;
  email: string;
  name: string;
  avatar: Avatar;
  type: UserType;
  completedActions: {
    electionReminders: boolean;
    registerToVote: boolean;
    sharedChallenge: boolean;
  };
  badges: Badge[];
  /**
   * The end date of the user's challenge stored in Unix seconds.
   */
  challengeEndTimestamp: number;
  completedChallenge: boolean;
  /**
   * An array of the challengers whose challenges a player has contributed to
   * by taking an action.
   *
   * @remarks
   * The names and avatars of these challengers are displayed on
   * the /actions page once the player has completed all possible actions.
   */
  contributedTo: Array<{ name: string; avatar: Avatar }>;
  /**
   * The most recent challenger to invite the player.
   *
   * @remarks
   * Each time the challenger clicks a new challenger's share link, this will be
   * updated.
   */
  invitedBy?: {
    inviteCode: string;
    name: string;
    avatar: Avatar;
  };
  inviteCode: string;
}
