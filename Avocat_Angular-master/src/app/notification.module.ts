import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from './notifier-config';

@NgModule({
  imports: [
    NotifierModule.withConfig(customNotifierOptions)
  ],
  exports: [NotifierModule]
})
export class NotificationModule {}
