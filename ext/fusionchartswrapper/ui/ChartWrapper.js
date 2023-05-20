/**
* This is a wrapper around FusionCharts which lets you use FusionCharts charts as native ExtJS components.
* You can use FusionChats ExtJS component in either ExtJS MVC way or as a normal ExtJS application.
*
* ## Usage
* 1. Download and extract the contents of the plugin. It contains the FusionCharts ExtJS plugin and a couple of examples. 
* 2. Copy the FusionCharts directory to your ExtJS application root
* 3. Require the plugin wherever you want to use FusionCharts ExtJS component
*    example: 
*     Ext.define('FCDemo.view.FCView' ,{
*       extend: 'Ext.tab.Panel',
*       requires: ['FusionCharts.ui.Chart'] ...
*   or
*     Ext.require(['FusionCharts.ui.Chart'])
* 3. Use the FusionCharts component inside your application just like any other ExtJS component where the xtype of the component is fusioncharts.
*         Ext.create('Ext.container.Viewport', {
*            layout: 'fit',
*            items: [
*                {
*                   xtype: 'fusioncharts',
*                   title: 'JSON URL',
*                   type: 'Column3d',
*                   chartId : null,
*                   chartwidth: '400',
*                   chartheight: '400',
*                   debugMode: '0',
*                   dataFormat : 1, // 0=> XML , 1=> JSON,
*                   data : jsonDataArray
*                }
*            ]
*         });
* 6. The following options are consumed by the fusioncharts component
*    a) type - Type of Chart. Defaults to Column2D
*    b) id - If you want to reference you chart elsewhere, you need to mention this and it has to unqiue for each chart
*    c) width - Default is set to 100%
*/

(function(){

    Ext.namespace("Ext.ui.Chart.Fusion");

    var chartname = Ext.ui.Chart.Fusion;

    Ext.ui.Chart.Fusion.Chartwrapper = Ext.extend(Ext.Panel, {
 
        ctype         : "Ext.ui.Chart.Fusion.Chartwrapper",
        html:"<body><div id='mychartpanelcontainer888'></div> </body>",
		region:'center',
		split:true,
		autoScroll:true,
	    layout : "fit",
	    chartwidth: '100%',
	    chartheight: '100%',

	    /**
	     * @cfg {String[]} type
	     * Set the default chart type to Column 2D, if type is not set
	     */
	     type: 'Column2D',
	     

       
       /** @private */
       initComponent   : function(config){
    	   chartname.Chartwrapper.superclass.initComponent.apply(this,arguments);
       },

       onResize : function(){
    	   chartname.Chartwrapper.superclass.onResize.apply(this,arguments);
       },
       
       /** @private */
       beforeDestroy : function(){
           if(this.validTask){
               this.validTask.stopAll();
               this.validTask = null;
           }
           chartname.Chartwrapper.superclass.beforeDestroy.apply(this,arguments);
       },

       onRender : function(ct, position){
    	   chartname.Chartwrapper.superclass.onRender.apply(this,arguments);
       },
        
    /**
    * Uses the FusionCharts constructor and methods to draw the chart based on the provided 
    * chart data.
    * @param {data} the chart data
    * @private
    */
    _drawChart: function() {

      var MyChart = new FusionCharts({
			type: this.type,
			id : this.chartId,
		    width: this.chartwidth,
		    height: this.chartheight,
		    renderAt: 'mychartpanelcontainer888',
			dataFormat: 1,
			dataSource: this.data,
			renderer : 'javascript',
			registerWithJS : "1"
		});
            
      MyChart.render();
      
    },

    
    /**
     * This methods updates the chart Data
     */
     setChartData: function(newData){
        var currentChart = FusionCharts(this.chartId);
        
		if(currentChart){
	        currentChart.dispose();
		}
		
      	this.data = newData;
        this._drawChart();

     },
    
    /**
    * This method updates the chart type by disposing the current chart
    * and creating a new one with the new chart type while preserving all the old chart
    * properties
    * @param {String} type 
    */
    setChartType: function(newType){
        var currentChart = FusionCharts(this.chartId);
        
		if(currentChart){
	        currentChart.dispose();
		}

    	this.type = newType;
        this._drawChart();
        
    },

    /**
    * This method updates the chart dimensions
    * @param {String} newWidth,
    * @param {String} newHeight
    */
    updateChartDimensions: function(newWidth, newHeight){
      var currentChart = FusionCharts(this.id);
      this.chartwidth = newWidth;
      this.chartheight = newHeight;
      currentChart.resizeTo(newWidth, newHeight);
    },


});
   
   Ext.reg('fusioncharts', Ext.ui.Chart.Fusion.Chartwrapper);

})();

