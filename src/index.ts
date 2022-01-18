import * as paper from 'paper';

class Game 
{
    private width : number;
    private height : number;
    private ship : paper.Group | undefined;
    
    constructor()
    {
        paper.setup('canvas');
        this.width = 1200;
        this.height = 800;
    }

    start() : void 
    {
        this.createScene();
        this.resize();

        paper.view.onResize = () => {this.resize();};
        paper.view.onMouseMove = (event: paper.MouseEvent) => {this.onMouseMove(event);};
        paper.view.onMouseDown = (event: paper.MouseEvent) => {this.onMouseDown(event);};
        paper.view.onFrame = (event: GameEvent) => {this.update(event);};

    }

    private createScene() : void 
    {
        this.ship = new paper.Group();
        this.ship!.applyMatrix = false;
        paper.project.importSVG('./assets/ship.svg', (item: paper.Item) => {
            item.addTo(this.ship!);
            this.ship!.scale(3);
            this.ship!.position.x = this.width / 2;
            this.ship!.position.y = this.height / 2;
        });
    }

    private update(event: GameEvent) : void
    {
        // This method will be called once per frame
    }

    private resize() : void
    {
        var aspectRatio = this.width / this.height;
        var newAspectRatio = paper.view.viewSize.width / paper.view.viewSize.height;
        if(newAspectRatio > aspectRatio)
            paper.view.zoom = paper.view.viewSize.width  / this.width;    
        else
            paper.view.zoom = paper.view.viewSize.height / this.height;
        
        paper.view.center = new paper.Point(this.width / 2, this.height / 2);
        
    }

    private onMouseMove(event: paper.MouseEvent) : void
    {
        var mouseVector = event.point.subtract(paper.view.center);
        this.ship!.rotation = mouseVector.angle + 90;
    }

    private onMouseDown(event: paper.MouseEvent) : void
    {
        console.log("Mouse click!");
    } 
}

class GameEvent
{
    readonly delta: number;
    readonly time: number;
    readonly count: number;

    constructor()
    {
        this.delta = 0;
        this.time = 0;
        this.count = 0;
    }
}
    
// start the game
var game = new Game();
game.start();