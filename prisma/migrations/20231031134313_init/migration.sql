-- CreateEnum
CREATE TYPE "SPEC_SETTING_OPERATOR" AS ENUM ('EQUATE', 'DECREASE', 'INCREASE', 'MULTIPLY', 'DIVIDE');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('START', 'ACTION', 'PROPOGATION', 'CHOICE', 'WAITING_ALL', 'WAITING_ONE', 'END');

-- CreateEnum
CREATE TYPE "CompareOperator" AS ENUM ('MORE', 'LESS', 'EQUAL', 'OR', 'AND');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('GET', 'POST', 'PATCH', 'PUT', 'DELETE');

-- CreateEnum
CREATE TYPE "requestInputFieldType" AS ENUM ('PARAM', 'BODY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasureUnit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MeasureUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "measureUnitId" INTEGER NOT NULL,
    "parentTypeId" INTEGER,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMPTZ,
    "measureUnitId" INTEGER,
    "baseProductId" INTEGER,
    "productTypeId" INTEGER NOT NULL,
    "configId" INTEGER,
    "drawing" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductParametrType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductParametrType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductParametr" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "measureUnitId" INTEGER NOT NULL,
    "productParametrTypeId" INTEGER NOT NULL,

    CONSTRAINT "ProductParametr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductParamterPossibleValue" (
    "paramId" INTEGER NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductParametrValues" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "parametrId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ProductParametrValues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTypeParametrValueLimit" (
    "productTypeId" INTEGER NOT NULL,
    "parametrId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ProductParametrValueLimit" (
    "productId" INTEGER NOT NULL,
    "parametrId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specification" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "usedProductId" INTEGER NOT NULL,
    "count" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Specification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecificationSettingsByParameter" (
    "id" SERIAL NOT NULL,
    "specificationId" INTEGER NOT NULL,
    "functionId" INTEGER NOT NULL,
    "parametrId" INTEGER,
    "operator" "SPEC_SETTING_OPERATOR" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "SpecificationSettingsByParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecificationSettingsByParametersFunction" (
    "id" SERIAL NOT NULL,
    "firstString" TEXT,
    "firstFunctionId" INTEGER,
    "firstParametrId" INTEGER NOT NULL,
    "secondString" TEXT,
    "secondFunctionId" INTEGER,
    "secondParametrId" INTEGER NOT NULL,
    "compareOperator" "CompareOperator" NOT NULL,

    CONSTRAINT "SpecificationSettingsByParametersFunction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessShablon" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "productTypeId" INTEGER NOT NULL,
    "baseShablonForChangeId" INTEGER,
    "baseShablonForCreateId" INTEGER,
    "maxLauchedProcessesCount" INTEGER,

    CONSTRAINT "ProcessShablon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessShablonActionHierarchy" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "ProcessShablonActionHierarchy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessShablonAction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ActionType" NOT NULL,
    "processShablonId" INTEGER NOT NULL,

    CONSTRAINT "ProcessShablonAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessShablonActionUsers" (
    "actionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ProcessShablonActionUserGroups" (
    "actionId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TransitionCondition" (
    "id" SERIAL NOT NULL,
    "transitionConditionFuncId" INTEGER NOT NULL,

    CONSTRAINT "TransitionCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransitionConditionFunc" (
    "id" SERIAL NOT NULL,
    "firstString" TEXT,
    "firstCompletedActionInputFieldId" INTEGER,
    "firstTransitionConditionId" INTEGER,
    "secondString" TEXT,
    "secondCompletedActionInputFieldId" INTEGER,
    "secondTransitionConditionId" INTEGER,
    "compareOperator" "CompareOperator" NOT NULL,

    CONSTRAINT "TransitionConditionFunc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "requestType" "RequestType" NOT NULL,
    "requestUrl" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessShablonActionInputField" (
    "id" SERIAL NOT NULL,
    "processShablonActionId" INTEGER NOT NULL,
    "requestInputFieldType" "requestInputFieldType",
    "requestParamName" TEXT,
    "requestId" INTEGER,
    "label" TEXT NOT NULL,

    CONSTRAINT "ProcessShablonActionInputField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "processShablonId" INTEGER NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionCompleting" (
    "id" SERIAL NOT NULL,
    "processId" INTEGER NOT NULL,
    "shablonActionId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ActionCompleting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedActionInputFieldValue" (
    "id" SERIAL NOT NULL,
    "completedActionId" INTEGER NOT NULL,
    "processShablonActionInputFieldId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CompletedActionInputFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_userId_groupId_key" ON "UserGroup"("userId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductParamterPossibleValue_paramId_value_key" ON "ProductParamterPossibleValue"("paramId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "ProductParametrValues_productId_parametrId_key" ON "ProductParametrValues"("productId", "parametrId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTypeParametrValueLimit_productTypeId_parametrId_key" ON "ProductTypeParametrValueLimit"("productTypeId", "parametrId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductParametrValueLimit_productId_parametrId_key" ON "ProductParametrValueLimit"("productId", "parametrId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessShablonActionUsers_actionId_userId_key" ON "ProcessShablonActionUsers"("actionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessShablonActionUserGroups_actionId_groupId_key" ON "ProcessShablonActionUserGroups"("actionId", "groupId");

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductType" ADD CONSTRAINT "ProductType_measureUnitId_fkey" FOREIGN KEY ("measureUnitId") REFERENCES "MeasureUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductType" ADD CONSTRAINT "ProductType_parentTypeId_fkey" FOREIGN KEY ("parentTypeId") REFERENCES "ProductType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_measureUnitId_fkey" FOREIGN KEY ("measureUnitId") REFERENCES "MeasureUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_baseProductId_fkey" FOREIGN KEY ("baseProductId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_configId_fkey" FOREIGN KEY ("configId") REFERENCES "Config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductParametr" ADD CONSTRAINT "ProductParametr_measureUnitId_fkey" FOREIGN KEY ("measureUnitId") REFERENCES "MeasureUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductParametr" ADD CONSTRAINT "ProductParametr_productParametrTypeId_fkey" FOREIGN KEY ("productParametrTypeId") REFERENCES "ProductParametrType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductParamterPossibleValue" ADD CONSTRAINT "ProductParamterPossibleValue_paramId_fkey" FOREIGN KEY ("paramId") REFERENCES "ProductParametr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductParametrValues" ADD CONSTRAINT "ProductParametrValues_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductParametrValues" ADD CONSTRAINT "ProductParametrValues_parametrId_fkey" FOREIGN KEY ("parametrId") REFERENCES "ProductParametr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductTypeParametrValueLimit" ADD CONSTRAINT "ProductTypeParametrValueLimit_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductTypeParametrValueLimit" ADD CONSTRAINT "ProductTypeParametrValueLimit_parametrId_fkey" FOREIGN KEY ("parametrId") REFERENCES "ProductParametr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductParametrValueLimit" ADD CONSTRAINT "ProductParametrValueLimit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductParametrValueLimit" ADD CONSTRAINT "ProductParametrValueLimit_parametrId_fkey" FOREIGN KEY ("parametrId") REFERENCES "ProductParametr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Specification" ADD CONSTRAINT "Specification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Specification" ADD CONSTRAINT "Specification_usedProductId_fkey" FOREIGN KEY ("usedProductId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificationSettingsByParameter" ADD CONSTRAINT "SpecificationSettingsByParameter_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "Specification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificationSettingsByParameter" ADD CONSTRAINT "SpecificationSettingsByParameter_functionId_fkey" FOREIGN KEY ("functionId") REFERENCES "SpecificationSettingsByParametersFunction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificationSettingsByParameter" ADD CONSTRAINT "SpecificationSettingsByParameter_parametrId_fkey" FOREIGN KEY ("parametrId") REFERENCES "ProductParametr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificationSettingsByParametersFunction" ADD CONSTRAINT "SpecificationSettingsByParametersFunction_firstFunctionId_fkey" FOREIGN KEY ("firstFunctionId") REFERENCES "SpecificationSettingsByParametersFunction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificationSettingsByParametersFunction" ADD CONSTRAINT "SpecificationSettingsByParametersFunction_firstParametrId_fkey" FOREIGN KEY ("firstParametrId") REFERENCES "ProductParametrValues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificationSettingsByParametersFunction" ADD CONSTRAINT "SpecificationSettingsByParametersFunction_secondFunctionId_fkey" FOREIGN KEY ("secondFunctionId") REFERENCES "SpecificationSettingsByParametersFunction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpecificationSettingsByParametersFunction" ADD CONSTRAINT "SpecificationSettingsByParametersFunction_secondParametrId_fkey" FOREIGN KEY ("secondParametrId") REFERENCES "ProductParametrValues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablon" ADD CONSTRAINT "ProcessShablon_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablon" ADD CONSTRAINT "ProcessShablon_baseShablonForChangeId_fkey" FOREIGN KEY ("baseShablonForChangeId") REFERENCES "ProcessShablon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablon" ADD CONSTRAINT "ProcessShablon_baseShablonForCreateId_fkey" FOREIGN KEY ("baseShablonForCreateId") REFERENCES "ProcessShablon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablonActionHierarchy" ADD CONSTRAINT "ProcessShablonActionHierarchy_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ProcessShablonAction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablonActionHierarchy" ADD CONSTRAINT "ProcessShablonActionHierarchy_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ProcessShablonAction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablonAction" ADD CONSTRAINT "ProcessShablonAction_processShablonId_fkey" FOREIGN KEY ("processShablonId") REFERENCES "ProcessShablon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablonActionUsers" ADD CONSTRAINT "actionId_userId_fkey" FOREIGN KEY ("actionId") REFERENCES "ProcessShablonAction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablonActionUsers" ADD CONSTRAINT "ProcessShablonActionUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablonActionUserGroups" ADD CONSTRAINT "actionId_groupId_fkey" FOREIGN KEY ("actionId") REFERENCES "ProcessShablonAction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablonActionUserGroups" ADD CONSTRAINT "ProcessShablonActionUserGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TransitionCondition" ADD CONSTRAINT "TransitionCondition_id_fkey" FOREIGN KEY ("id") REFERENCES "ProcessShablonActionHierarchy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TransitionCondition" ADD CONSTRAINT "TransitionCondition_transitionConditionFuncId_fkey" FOREIGN KEY ("transitionConditionFuncId") REFERENCES "TransitionConditionFunc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TransitionConditionFunc" ADD CONSTRAINT "TransitionConditionFunc_firstCompletedActionInputFieldId_fkey" FOREIGN KEY ("firstCompletedActionInputFieldId") REFERENCES "ProcessShablonActionInputField"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TransitionConditionFunc" ADD CONSTRAINT "TransitionConditionFunc_firstTransitionConditionId_fkey" FOREIGN KEY ("firstTransitionConditionId") REFERENCES "TransitionConditionFunc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TransitionConditionFunc" ADD CONSTRAINT "TransitionConditionFunc_secondCompletedActionInputFieldId_fkey" FOREIGN KEY ("secondCompletedActionInputFieldId") REFERENCES "ProcessShablonActionInputField"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TransitionConditionFunc" ADD CONSTRAINT "TransitionConditionFunc_secondTransitionConditionId_fkey" FOREIGN KEY ("secondTransitionConditionId") REFERENCES "TransitionConditionFunc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablonActionInputField" ADD CONSTRAINT "ProcessShablonActionInputField_processShablonActionId_fkey" FOREIGN KEY ("processShablonActionId") REFERENCES "ProcessShablonAction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessShablonActionInputField" ADD CONSTRAINT "ProcessShablonActionInputField_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_processShablonId_fkey" FOREIGN KEY ("processShablonId") REFERENCES "ProcessShablon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ActionCompleting" ADD CONSTRAINT "ActionCompleting_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ActionCompleting" ADD CONSTRAINT "ActionCompleting_shablonActionId_fkey" FOREIGN KEY ("shablonActionId") REFERENCES "ProcessShablonAction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompletedActionInputFieldValue" ADD CONSTRAINT "CompletedActionInputFieldValue_completedActionId_fkey" FOREIGN KEY ("completedActionId") REFERENCES "ActionCompleting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompletedActionInputFieldValue" ADD CONSTRAINT "CompletedActionInputFieldValue_processShablonActionInputFi_fkey" FOREIGN KEY ("processShablonActionInputFieldId") REFERENCES "ProcessShablonActionInputField"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
