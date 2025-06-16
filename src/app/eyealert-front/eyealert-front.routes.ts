
import { Routes } from '@angular/router';
import { EyeAlertFrontLayoutComponent } from './layouts/eye-alert-front-layout/eye-alert-front-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MyEvalutionsPageComponent } from './pages/my-evalutions-page/my-evalutions-page.component';
import { InformativeDataPageComponent } from './pages/informative-data-page/informative-data-page.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';

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
                path: 'my-evaluations',
                component: MyEvalutionsPageComponent
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
                path: '**',
                redirectTo: 'home'
        
            }
        ]
    
    }
]

export default routes