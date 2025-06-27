import { Routes } from '@angular/router';
import { ListEvalutionsPageComponent } from './pages/list-evalutions-page/list-evalutions-page.component';
import { NewEvaluationPageComponent } from './pages/new-evaluation-page/new-evaluation-page.component';
import { DetailsEvaluationPageComponent } from './pages/details-evaluation-page/details-evaluation-page.component';


const routes: Routes = [
    {
        path: '',
        component: ListEvalutionsPageComponent
    },
    { 
        path: 'new-evaluation',
        component: NewEvaluationPageComponent
    },
    {
        path: ':id',
        component: DetailsEvaluationPageComponent
    }
]

export default routes;