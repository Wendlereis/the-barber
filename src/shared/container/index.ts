import { container } from 'tsyringe'

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IAppointnebtsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

container.registerSingleton<IAppointnebtsRepository>('AppointmentsRepository', AppointmentsRepository)

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
