---
title: pytorch所有自动微分的操作
tags:
  - DeepLearning
categories:
  - [DeepLearning]
date: 2024-11-13T06:33:19.115Z
updated: 2024-11-13T06:41:16.726Z
comments: true

---

<!--more-->
## 所有自动微分的操作

| 操作 | grad_fn |
|---|---|
| |  AbsBackward0 | 
| |  AcosBackward0 | 
| |  AddBackward0 | 
| |  AddbmmBackward0 | 
| |  AddcdivBackward0 | 
| |  AddcmulBackward0 | 
| |  AddmmBackward0 | 
| |  SparseAddmmBackward0 | 
| |  AddmvBackward0 | 
| |  AddrBackward0 | 
| |  AffineGridGeneratorBackward0 | 
| |  AliasBackward0 | 
| |  AngleBackward0 | 
| |  AcoshBackward0 | 
| |  AsinhBackward0 | 
| |  AtanhBackward0 | 
| |  AsStridedBackward0 | 
| |  AsinBackward0 | 
| |  AtanBackward0 | 
| |  Atan2Backward0 | 
| |  BaddbmmBackward0 | 
| |  BernoulliBackward0 | 
| |  BmmBackward0 | 
| |  MatmulBackward0 | 
| |  CatBackward0 | 
| |  CauchyBackward0 | 
| |  CeilBackward0 | 
| |  CholeskyBackward0 | 
| |  LinalgCholeskyExBackward0 | 
| |  CholeskySolveBackward0 | 
| |  CholeskyInverseBackward0 | 
| |  ClampBackward0 | 
| |  ClampMinBackward0 | 
| |  ClampMaxBackward0 | 
| |  CloneBackward0 | 
| |  LazyCloneBackward0 | 
| |  ToCopyBackward0 | 
| |  CoalesceBackward0 | 
| |  ComplexBackward0 | 
| |  PolarBackward0 | 
| |  ConjBackward0 | 
| |  NegViewBackward0 | 
| |  ConjPhysicalBackward0 | 
| |  CopysignBackward0 | 
| |  CosBackward0 | 
| |  CoshBackward0 | 
| |  LinalgCrossBackward0 | 
| |  LogcumsumexpBackward0 | 
| |  CumprodBackward0 | 
| |  CumsumBackward0 | 
| |  CummaxBackward0 | 
| |  CumminBackward0 | 
| |  ConvTbcBackward0 | 
| |  CtcLossBackward0 | 
| |  Deg2RadBackward0 | 
| |  LinalgDetBackward0 | 
| |  LinalgSlogdetBackward0 | 
| |  BlockDiagBackward0 | 
| |  DiagEmbedBackward0 | 
| |  DiagonalBackward0 | 
| |  DiagonalBackwardBackward0 | 
| |  DistBackward0 | 
| |  DivBackward0 | 
| |  DotBackward0 | 
| |  VdotBackward0 | 
| |  FusedDropoutBackward0 | 
| |  NativeDropoutBackward0 | 
| |  NativeDropoutBackwardBackward0 | 
| |  EqBackward0 | 
| |  ErfBackward0 | 
| |  ErfcBackward0 | 
| |  SpecialErfcxBackward0 | 
| |  ErfinvBackward0 | 
| |  ExpBackward0 | 
| |  Exp2Backward0 | 
| |  Expm1Backward0 | 
| |  ExpandBackward0 | 
| |  ExponentialBackward0 | 
| |  FakeQuantizePerTensorAffineCachemaskBackward0 | 
| |  FakeQuantizePerTensorAffineCachemaskTensorQparamsBackward0 | 
| |  FakeQuantizeLearnablePerTensorAffineBackward0 | 
| |  FakeQuantizePerChannelAffineCachemaskBackward0 | 
| |  FakeQuantizeLearnablePerChannelAffineBackward0 | 
| |  FusedMovingAvgObsFqHelperBackward0 | 
| |  FillBackward0 | 
| |  FloorBackward0 | 
| |  FmodBackward0 | 
| |  FracBackward0 | 
| |  FrexpBackward0 | 
| |  GatherBackward0 | 
| |  GeBackward0 | 
| |  GeometricBackward0 | 
| |  GeqrfBackward0 | 
| |  GridSampler2DBackward0 | 
| |  GridSampler3DBackward0 | 
| |  GridSampler2DCpuFallbackBackward0 | 
| |  GtBackward0 | 
| |  HardsigmoidBackward0 | 
| |  HardswishBackward0 | 
| |  HardswishBackwardBackward0 | 
| |  HypotBackward0 | 
| |  I0Backward0 | 
| |  SpecialI0EBackward0 | 
| |  SpecialI1Backward0 | 
| |  SpecialI1EBackward0 | 
| |  IgammaBackward0 | 
| |  IgammacBackward0 | 
| |  IndexBackward0 | 
| |  UnsafeIndexBackward0 | 
| |  IndexAddBackward0 | 
| |  IndexReduceBackward0 | 
| |  IndexCopyBackward0 | 
| |  IndexFillBackward0 | 
| |  IndexPutBackward0 | 
| |  UnsafeIndexPutBackward0 | 
| |  IndexPutImplBackward0 | 
| |  IndexSelectBackward0 | 
| |  LinalgInvExBackward0 | 
| |  LinalgPinvBackward0 | 
| |  KthvalueBackward0 | 
| |  LeBackward0 | 
| |  LerpBackward0 | 
| |  LgammaBackward0 | 
| |  DigammaBackward0 | 
| |  PolygammaBackward0 | 
| |  LogBackward0 | 
| |  Log10Backward0 | 
| |  Log1PBackward0 | 
| |  Log2Backward0 | 
| |  LogaddexpBackward0 | 
| |  Logaddexp2Backward0 | 
| |  XlogyBackward0 | 
| |  SpecialXlog1PyBackward0 | 
| |  SpecialZetaBackward0 | 
| |  LogNormalBackward0 | 
| |  LogsumexpBackward0 | 
| |  LinalgLstsqBackward0 | 
| |  LtBackward0 | 
| |  LinalgLuFactorExBackward0 | 
| |  LinalgLuBackward0 | 
| |  LinalgLuSolveBackward0 | 
| |  LuUnpackBackward0 | 
| |  MaskedFillBackward0 | 
| |  MaskedScatterBackward0 | 
| |  MaskedScatterBackwardBackward0 | 
| |  MaskedSelectBackward0 | 
| |  LinalgMatrixExpBackward0 | 
| |  MaxBackward0 | 
| |  MaximumBackward0 | 
| |  FmaxBackward0 | 
| |  MeanBackward0 | 
| |  MedianBackward0 | 
| |  NanmedianBackward0 | 
| |  MinBackward0 | 
| |  MinimumBackward0 | 
| |  FminBackward0 | 
| |  AmaxBackward0 | 
| |  AminBackward0 | 
| |  MmBackward0 | 
| |  ModeBackward0 | 
| |  MulBackward0 | 
| |  MvBackward0 | 
| |  MvlgammaBackward0 | 
| |  NanToNumBackward0 | 
| |  NativeBatchNormBackward0 | 
| |  NativeBatchNormLegitBackward0 | 
| |  NativeBatchNormLegitNoTrainingBackward0 | 
| |  NativeBatchNormBackwardBackward0 | 
| |  NativeLayerNormBackward0 | 
| |  NativeLayerNormBackwardBackward0 | 
| |  NativeGroupNormBackward0 | 
| |  NeBackward0 | 
| |  NegBackward0 | 
| |  BatchNormWithUpdateBackward0 | 
| |  BatchNormNoUpdateBackward0 | 
| |  BatchNormBackwardBackward0 | 
| |  NextafterBackward0 | 
| |  NormBackward0 | 
| |  LinalgVectorNormBackward0 | 
| |  PdistBackward0 | 
| |  PdistBackwardBackward0 | 
| |  EuclideanDistBackward0 | 
| |  CdistBackward0 | 
| |  CdistBackwardBackward0 | 
| |  NormalBackward0 | 
| |  LinalgHouseholderProductBackward0 | 
| |  OrmqrBackward0 | 
| |  PermuteBackward0 | 
| |  PoissonBackward0 | 
| |  PowBackward0 | 
| |  ProdBackward0 | 
| |  PutBackward0 | 
| |  LinalgQrBackward0 | 
| |  Rad2DegBackward0 | 
| |  RandomBackward0 | 
| |  ReciprocalBackward0 | 
| |  RemainderBackward0 | 
| |  RenormBackward0 | 
| |  RepeatBackward0 | 
| |  SpecialEntrBackward0 | 
| |  SpecialNdtriBackward0 | 
| |  SpecialLogNdtrBackward0 | 
| |  ReshapeAliasBackward0 | 
| |  RoundBackward0 | 
| |  RsqrtBackward0 | 
| |  ScatterBackward0 | 
| |  ScatterAddBackward0 | 
| |  SelectBackward0 | 
| |  SelectBackwardBackward0 | 
| |  SigmoidBackward0 | 
| |  LogitBackward0 | 
| |  SignBackward0 | 
| |  SgnBackward0 | 
| |  SinBackward0 | 
| |  SincBackward0 | 
| |  SinhBackward0 | 
| |  SliceBackward0 | 
| |  SliceBackwardBackward0 | 
| |  SliceInverseBackward0 | 
| |  SliceScatterBackward0 | 
| |  SelectScatterBackward0 | 
| |  DiagonalScatterBackward0 | 
| |  AsStridedScatterBackward0 | 
| |  LinalgSolveExBackward0 | 
| |  SortBackward0 | 
| |  SplitBackward0 | 
| |  UnsafeSplitBackward0 | 
| |  SplitWithSizesBackward0 | 
| |  UnsafeSplitWithSizesBackward0 | 
| |  SqrtBackward0 | 
| |  SqueezeBackward0 | 
| |  StdBackward0 | 
| |  StdMeanBackward0 | 
| |  SubBackward0 | 
| |  RsubBackward0 | 
| |  SumBackward0 | 
| |  NansumBackward0 | 
| |  LinalgSvdBackward0 | 
| |  LinalgEighBackward0 | 
| |  LinalgEigBackward0 | 
| |  TBackward0 | 
| |  FlipBackward0 | 
| |  RollBackward0 | 
| |  Rot90Backward0 | 
| |  TakeBackward0 | 
| |  TanBackward0 | 
| |  TanhBackward0 | 
| |  TopkBackward0 | 
| |  TraceBackward0 | 
| |  TransposeBackward0 | 
| |  TriangularSolveBackward0 | 
| |  LinalgSolveTriangularBackward0 | 
| |  TrilBackward0 | 
| |  TriuBackward0 | 
| |  TruncBackward0 | 
| |  ToDenseBackward0 | 
| |  ToSparseBackward0 | 
| |  ToSparseCsrBackward0 | 
| |  ToSparseCscBackward0 | 
| |  ToSparseBsrBackward0 | 
| |  ToSparseBscBackward0 | 
| |  ToMkldnnBackward0 | 
| |  UnfoldBackward0 | 
| |  UnfoldBackwardBackward0 | 
| |  UniformBackward0 | 
| |  UniqueBackward0 | 
| |  UniqueDimBackward0 | 
| |  UniqueConsecutiveBackward0 | 
| |  UniqueDimConsecutiveBackward0 | 
| |  Unique2Backward0 | 
| |  UnsafeViewBackward0 | 
| |  LiftBackward0 | 
| |  LiftFreshBackward0 | 
| |  UnsqueezeBackward0 | 
| |  VarBackward0 | 
| |  VarMeanBackward0 | 
| |  ViewBackward0 | 
| |  ViewAsRealBackward0 | 
| |  ViewAsComplexBackward0 | 
| |  WhereBackward0 | 
| |  WeightNormInterfaceBackward0 | 
| |  ZeroBackward0 | 
| |  SparseMaskBackward0 | 
| |  SparseCooTensorWithDimsAndTensorsBackward0 | 
| |  SparseCompressedTensorBackward0 | 
| |  SparseSumBackward0 | 
| |  StandardGammaBackward0 | 
| |  StandardGammaGradBackward0 | 
| |  ValuesBackward0 | 
| |  TrilinearBackward0 | 
| |  ConstantPadNdBackward0 | 
| |  BinaryCrossEntropyBackward0 | 
| |  BinaryCrossEntropyBackwardBackward0 | 
| |  BinaryCrossEntropyWithLogitsBackward0 | 
| |  EmbeddingBackward0 | 
| |  EmbeddingDenseBackwardBackward0 | 
| |  EmbeddingBagBackward0 | 
| |  EmbeddingRenormBackward0 | 
| |  MseLossBackward0 | 
| |  MultiMarginLossBackward0 | 
| |  MultilabelMarginLossBackward0 | 
| |  NllLossBackward0 | 
| |  NllLoss2DBackward0 | 
| |  SmoothL1LossBackward0 | 
| |  HuberLossBackward0 | 
| |  SoftMarginLossBackward0 | 
| |  ReluBackward0 | 
| |  SiluBackward0 | 
| |  MishBackward0 | 
| |  EluBackward0 | 
| |  CeluBackward0 | 
| |  GeluBackward0 | 
| |  GeluBackwardBackward0 | 
| |  GluBackward0 | 
| |  HardshrinkBackward0 | 
| |  HardshrinkBackwardBackward0 | 
| |  HardtanhBackward0 | 
| |  LeakyReluBackward0 | 
| |  LogSigmoidBackward0 | 
| |  LogSoftmaxBackward0 | 
| |  SparseLogSoftmaxBackward0 | 
| |  MaskedSoftmaxBackward0 | 
| |  PreluKernelBackward0 | 
| |  PreluKernelBackwardBackward0 | 
| |  RreluWithNoiseBackward0 | 
| |  SoftmaxBackward0 | 
| |  SparseSoftmaxBackward0 | 
| |  SparseSparseMatmulBackward0 | 
| |  SoftplusBackward0 | 
| |  SoftshrinkBackward0 | 
| |  ThresholdBackward0 | 
| |  ReflectionPad1DBackward0 | 
| |  ReflectionPad2DBackward0 | 
| |  ReflectionPad3DBackward0 | 
| |  ReplicationPad1DBackward0 | 
| |  ReplicationPad2DBackward0 | 
| |  ReplicationPad3DBackward0 | 
| |  UpsampleLinear1DBackward0 | 
| |  UpsampleBilinear2DBackward0 | 
| |  UpsampleBilinear2DAaBackward0 | 
| |  UpsampleBicubic2DBackward0 | 
| |  UpsampleBicubic2DAaBackward0 | 
| |  UpsampleTrilinear3DBackward0 | 
| |  UpsampleNearest1DBackward0 | 
| |  UpsampleNearestExact1DBackward0 | 
| |  UpsampleNearest2DBackward0 | 
| |  UpsampleNearestExact2DBackward0 | 
| |  UpsampleNearest3DBackward0 | 
| |  UpsampleNearestExact3DBackward0 | 
| |  PixelShuffleBackward0 | 
| |  PixelUnshuffleBackward0 | 
| |  AdaptiveAvgPool2DBackward0 | 
| |  AdaptiveAvgPool3DBackward0 | 
| |  AdaptiveMaxPool2DBackward0 | 
| |  AdaptiveMaxPool3DBackward0 | 
| |  AvgPool2DBackward0 | 
| |  AvgPool3DBackward0 | 
| |  FractionalMaxPool2DBackward0 | 
| |  FractionalMaxPool3DBackward0 | 
| |  LinearBackward0 | 
| |  LinearBackwardBackward0 | 
| |  MaxPool2DBackward0 | 
| |  MpsConvolutionBackward0 | 
| |  MpsConvolutionBackwardBackward0 | 
| |  MaxPool2DWithIndicesBackward0 | 
| |  MaxPool3DWithIndicesBackward0 | 
| |  MaxUnpool2DBackward0 | 
| |  MaxUnpool3DBackward0 | 
| |  ConvolutionBackward0 | 
| |  ConvolutionBackwardBackward0 | 
| |  ConvolutionOverrideableBackward0 | 
| |  ConvolutionBackwardOverrideableBackward0 | 
| |  SlowConvTranspose2DBackward0 | 
| |  SlowConvTranspose3DBackward0 | 
| |  SlowConv2DBackward0 | 
| |  SlowConv2DBackwardBackward0 | 
| |  ConvDepthwise2DBackward0 | 
| |  ConvDepthwise3DBackward0 | 
| |  SlowConv3DBackward0 | 
| |  SlowConvDilated2DBackward0 | 
| |  SlowConvDilated3DBackward0 | 
| |  Col2ImBackward0 | 
| |  Im2ColBackward0 | 
| |  AdaptiveAvgPool2DBackwardBackward0 | 
| |  AdaptiveAvgPool3DBackwardBackward0 | 
| |  AdaptiveMaxPool2DBackwardBackward0 | 
| |  AdaptiveMaxPool3DBackwardBackward0 | 
| |  AvgPool2DBackwardBackward0 | 
| |  AvgPool3DBackwardBackward0 | 
| |  EluBackwardBackward0 | 
| |  FractionalMaxPool2DBackwardBackward0 | 
| |  FractionalMaxPool3DBackwardBackward0 | 
| |  GluBackwardBackward0 | 
| |  HardtanhBackwardBackward0 | 
| |  LogSigmoidBackwardBackward0 | 
| |  LogSoftmaxBackwardDataBackward0 | 
| |  LeakyReluBackwardBackward0 | 
| |  MaxPool2DBackwardBackward0 | 
| |  MaxPool2DWithIndicesBackwardBackward0 | 
| |  MaxPool3DWithIndicesBackwardBackward0 | 
| |  MseLossBackwardBackward0 | 
| |  NllLossBackwardBackward0 | 
| |  NllLoss2DBackwardBackward0 | 
| |  RreluWithNoiseBackwardBackward0 | 
| |  ReflectionPad1DBackwardBackward0 | 
| |  ReflectionPad2DBackwardBackward0 | 
| |  ReflectionPad3DBackwardBackward0 | 
| |  ReplicationPad1DBackwardBackward0 | 
| |  ReplicationPad2DBackwardBackward0 | 
| |  ReplicationPad3DBackwardBackward0 | 
| |  SparseSampledAddmmBackward0 | 
| |  SparseMmReduceImplBackward0 | 
| |  SmoothL1LossBackwardBackward0 | 
| |  HuberLossBackwardBackward0 | 
| |  SoftplusBackwardBackward0 | 
| |  SoftmaxBackwardDataBackward0 | 
| |  SoftMarginLossBackwardBackward0 | 
| |  SoftshrinkBackwardBackward0 | 
| |  ThresholdBackwardBackward0 | 
| |  UpsampleLinear1DBackwardBackward0 | 
| |  UpsampleBilinear2DBackwardBackward0 | 
| |  UpsampleBilinear2DAaBackwardBackward0 | 
| |  UpsampleBicubic2DBackwardBackward0 | 
| |  UpsampleBicubic2DAaBackwardBackward0 | 
| |  UpsampleTrilinear3DBackwardBackward0 | 
| |  UpsampleNearest1DBackwardBackward0 | 
| |  UpsampleNearestExact1DBackwardBackward0 | 
| |  UpsampleNearest2DBackwardBackward0 | 
| |  UpsampleNearestExact2DBackwardBackward0 | 
| |  UpsampleNearest3DBackwardBackward0 | 
| |  UpsampleNearestExact3DBackwardBackward0 | 
| |  SigmoidBackwardBackward0 | 
| |  TanhBackwardBackward0 | 
| |  CudnnCtcLossBackward0 | 
| |  CudnnConvolutionTransposeBackward0 | 
| |  MpsConvolutionTransposeBackward0 | 
| |  CudnnConvolutionBackward0 | 
| |  CudnnGridSamplerBackward0 | 
| |  CudnnAffineGridGeneratorBackward0 | 
| |  CudnnBatchNormBackward0 | 
| |  CudnnBatchNormBackwardBackward0 | 
| |  NnpackSpatialConvolutionBackward0 | 
| |  LstmMpsBackward0 | 
| |  CudnnRnnBackward0 | 
| |  CudnnRnnBackwardBackward0 | 
| |  MiopenConvolutionTransposeBackward0 | 
| |  MiopenConvolutionBackward0 | 
| |  MiopenDepthwiseConvolutionBackward0 | 
| |  MiopenBatchNormBackward0 | 
| |  MiopenBatchNormBackwardBackward0 | 
| |  MiopenRnnBackward0 | 
| |  MkldnnRnnLayerBackward0 | 
| |  MkldnnConvolutionBackward0 | 
| |  MkldnnLinearBackward0 | 
| |  MkldnnMaxPool2DBackward0 | 
| |  MkldnnMaxPool3DBackward0 | 
| |  MkldnnAdaptiveAvgPool2DBackward0 | 
| |  MkldnnReshapeBackward0 | 
| |  NestedTensorFromTensorListBackward0 | 
| |  NestedTensorFromMaskBackward0 | 
| |  NestedFromPaddedBackward0 | 
| |  ToPaddedTensorBackward0 | 
| |  NestedViewFromBufferBackward0 | 
| |  NestedViewFromJaggedBackward0 | 
| |  NestedGetValuesBackward0 | 
| |  ScaledDotProductEfficientAttentionBackward0 | 
| |  ScaledDotProductFlashAttentionBackward0 | 
| |  ScaledDotProductFlashAttentionForCpuBackward0 | 
| |  FlashAttentionBackward0 | 
| |  EfficientAttentionBackward0 | 
| |  ScaledDotProductCudnnAttentionBackward0 | 
| |  FftR2CBackward0 | 
| |  FftC2RBackward0 | 
| |  FftC2CBackward0 | 
| |  UnbindBackward0 | 
| |  StackBackward0 | 
| |  ThnnFusedLstmCellBackward0 | 
| |  ThnnFusedGruCellBackward0 | 
| |  PackPaddedSequenceBackward0 | 
| |  SegmentReduceBackward0 | 
| |  PinMemoryBackward0 | 
| |  TestWarnInAutogradBackward0 | 
| |  TestAutogradMultipleDispatchBackward0 | 
| |  TestAutogradMultipleDispatchViewBackward0 | 
| |  ScatterReduceBackward0 | 
| |  ReshapeCopyBackward0 | 
| |  ForeachDivBackward0 | 
| |  ForeachPowBackward0 | 
| |  ForeachMinimumBackward0 | 
| |  ForeachMaximumBackward0 | 
| |  ForeachNormBackward0 | 
| |  AliasBackward0 | 
| |  AsStridedBackward0 | 
| |  ConjBackward0 | 
| |  NegViewBackward0 | 
| |  DiagonalBackward0 | 
| |  ExpandBackward0 | 
| |  PermuteBackward0 | 
| |  ReshapeAliasBackward0 | 
| |  SelectBackward0 | 
| |  SliceBackward0 | 
| |  SplitBackward0 | 
| |  SplitWithSizesBackward0 | 
| |  SqueezeBackward0 | 
| |  TBackward0 | 
| |  TransposeBackward0 | 
| |  UnfoldBackward0 | 
| |  LiftFreshBackward0 | 
| |  UnsqueezeBackward0 | 
| |  ViewBackward0 | 
| |  ViewAsRealBackward0 | 
| |  ViewAsComplexBackward0 | 
| |  ValuesBackward0 | 
| |  NestedViewFromBufferBackward0 | 
| |  NestedViewFromJaggedBackward0 | 
| |  NestedGetValuesBackward0 | 
| |  UnbindBackward0 | 
| |  TestAutogradMultipleDispatchViewBackward0 | 
| |  ForeachAbsBackward0 | 
| |  ForeachAcosBackward0 | 
| |  ForeachAddBackward0 | 
| |  ForeachAddBackward0 | 
| |  ForeachAddcdivBackward0 | 
| |  ForeachAddcdivBackward0 | 
| |  ForeachAddcmulBackward0 | 
| |  ForeachAddcmulBackward0 | 
| |  ForeachAsinBackward0 | 
| |  ForeachAtanBackward0 | 
| |  ForeachCeilBackward0 | 
| |  ForeachClampMaxBackward0 | 
| |  ForeachClampMaxBackward0 | 
| |  ForeachClampMinBackward0 | 
| |  ForeachClampMinBackward0 | 
| |  ForeachCosBackward0 | 
| |  ForeachCoshBackward0 | 
| |  ForeachDivBackward0 | 
| |  ForeachErfBackward0 | 
| |  ForeachErfcBackward0 | 
| |  ForeachExpBackward0 | 
| |  ForeachExpm1Backward0 | 
| |  ForeachFloorBackward0 | 
| |  ForeachFracBackward0 | 
| |  ForeachLerpBackward0 | 
| |  ForeachLgammaBackward0 | 
| |  ForeachLogBackward0 | 
| |  ForeachLog10Backward0 | 
| |  ForeachLog1PBackward0 | 
| |  ForeachLog2Backward0 | 
| |  ForeachMaximumBackward0 | 
| |  ForeachMinimumBackward0 | 
| |  ForeachMulBackward0 | 
| |  ForeachMulBackward0 | 
| |  ForeachNegBackward0 | 
| |  ForeachPowBackward0 | 
| |  ForeachReciprocalBackward0 | 
| |  ForeachRoundBackward0 | 
| |  ForeachSigmoidBackward0 | 
| |  ForeachSignBackward0 | 
| |  ForeachSinBackward0 | 
| |  ForeachSinhBackward0 | 
| |  ForeachSqrtBackward0 | 
| |  ForeachSubBackward0 | 
| |  ForeachTanBackward0 | 
| |  ForeachTanhBackward0 | 
| |  ForeachTruncBackward0 |