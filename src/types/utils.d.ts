type DatabaseConstraintError = {
  type: 'unique' | 'check' | 'not null' | 'foreign key' | 'unknown';
  columnName?: string;
  message?: string;
};

type UserIdParam = {
  userID: string;
};

type NewEmailBody = {
  newEmail: string;
};
