// Social Authentication Service Providers



export enum UserRoles {
  ADMIN = 'Admin',
  TEAMLEADD = 'TeamLead',
  RESOURCE = 'Resource',
  PROJECT_MANAGER = 'ProjectManager',
  HUMAN_RESOURCE = 'HumanResource',
}
export enum RequestStatusTypes {
  INPROGRESS = 'Inprogress',
  PENDING = 'Pending',
  ACCEPTED_BY_LEAD = 'Accepted By Lead',
  REJECTED_BY_LEAD = 'Rejected By Lead',
  ACCEPTED_BY_ADMIN = 'Accepted By Admin',
  REJECTED_BY_ADMIN = 'Rejected By Admin',
  DISPATCH = 'Dispatch',
}
export enum PriorityTypes {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}
