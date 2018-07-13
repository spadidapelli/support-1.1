/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';


import { CreatesupportrequestComponent } from './createsupportrequest/createsupportrequest.component';
import { KbsearchComponent } from './kbsearch/kbsearch.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'support', pathMatch: 'full'},
    {path: 'support', component: KbsearchComponent},
    {path: 'createsupportrequest', component: CreatesupportrequestComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
