import { Test, TestingModule } from "@nestjs/testing";


describe('AppController', ()=>{
    let appController 

    beforeEach(async ()=>{
        const app: TestingModule = await TextDecoderStream.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', ()=>{
        it('should return hello world',()=>{
            expect(appController.getHello()).toBe('Hello World');
        })
    })
})