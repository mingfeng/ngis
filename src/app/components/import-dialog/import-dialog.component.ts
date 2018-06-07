import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MapService } from '../../services/map.service';
import { Layer, VectorFormat } from '../../shared/interfaces';
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent {

  importForm: FormGroup;

  vectorLayers: Layer[];
  vectorFormats: VectorFormat[];

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private layerService: LayerService
  ) {
    forkJoin(
      this.layerService.getVectorLayers(),
      this.layerService.getVectorFormats()
    ).subscribe(([layers, formats]) => {
      this.vectorLayers = layers;
      this.vectorFormats = formats;
      this.createForm();
    });
  }

  createForm() {
    const layer = this.vectorLayers.length > 0 ? this.vectorLayers[0].identifier : '';
    const format = this.vectorFormats.length > 0 ? this.vectorFormats[0].type : '';
    this.importForm = this.formBuilder.group({
      layer,
      format,
      projection: '',
      contents: ''
    });
  }

  onSubmit() {
    this.mapService.importVectorFeatures(this.importForm.value);
  }

}
