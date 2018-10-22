import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { NewComponent } from './new/new.component';
import { PetsComponent } from './pets/pets.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'details/:id', component: DetailsComponent },
  //Don't need delete as not having a page:
  { path: '', pathMatch: 'full', redirectTo: 'pets' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
