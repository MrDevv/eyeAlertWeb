
import { Routes } from '@angular/router';
import { InformativeDataPageComponent } from './informative-data/pages/informative-data-page/informative-data-page.component';
import { QuizPageComponent } from './quizz/pages/quiz-page/quiz-page.component';
import { StatisticsPageComponent } from './statistics/pages/statistics-page/statistics-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { EyeAlertFrontLayoutComponent } from './shared/layouts/eye-alert-front-layout/eye-alert-front-layout.component';
import { ListEvalutionsPageComponent } from './evaluations/pages/list-evalutions-page/list-evalutions-page.component';
import { EditProfileComponent } from './user-profile/pages/edit-profile/edit-profile.component';

export const routes: Routes = [
    {
        path: '',
        component: EyeAlertFrontLayoutComponent,
        children: [
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: 'evaluations',
                loadChildren: () => import('./evaluations/evaluations.routes')
            },
            {
                path: 'informative-data',
                component: InformativeDataPageComponent
            },
            {
                path: 'quiz',
                component: QuizPageComponent
            },
            {
                path: 'statistics',
                component: StatisticsPageComponent
            },
            {
                path: 'edit-profile',
                component: EditProfileComponent
            },
            {
                path: '**',
                redirectTo: 'home'
        
            }
        ]
    
    }
]

export default routes